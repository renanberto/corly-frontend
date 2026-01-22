import { useRef, useState } from 'react';
import { Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from '@heroui/react';
import { useParams } from 'react-router-dom';
import { useCaseDetail } from '@/features/cases/queries';
import { BlockersPanel } from '@/presentation/components/BlockersPanel';
import { DocumentCard } from '@/presentation/components/DocumentCard';
import { TimelineItem } from '@/presentation/components/TimelineItem';
import { LoadingSkeleton } from '@/presentation/components/LoadingSkeleton';
import { useDocumentTransitionVM, useDocumentUploadVM } from '@/presentation/viewmodels/useDocumentsVM';

const statuses = [
  { key: 'PENDING', label: 'Pendente' },
  { key: 'SUBMITTED', label: 'Enviado' },
  { key: 'APPROVED', label: 'Aprovado' },
  { key: 'REJECTED', label: 'Rejeitado' }
];

export const CaseDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useCaseDetail(id ?? '');
  const { mutateAsync: uploadDocument, isPending: isUploading } = useDocumentUploadVM();
  const { mutateAsync: transitionDoc } = useDocumentTransitionVM();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [transitionDocId, setTransitionDocId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('PENDING');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (docId: string) => {
    setSelectedDoc(docId);
    fileRef.current?.click();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedDoc) return;
    await uploadDocument({ documentId: selectedDoc, file });
    event.target.value = '';
  };

  if (isLoading) {
    return <LoadingSkeleton lines={6} />;
  }

  if (!data) {
    return <Card className="p-6">Caso não encontrado.</Card>;
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <div className="text-sm text-slate-500 flex flex-wrap gap-4">
          <span>Status: {data.status}</span>
          <span>Banco: {data.bank}</span>
          <span>Vencimento: {data.dueAt ? new Date(data.dueAt).toLocaleDateString() : '—'}</span>
        </div>
      </header>

      <section className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <Card className="p-5 space-y-4">
            <h3 className="font-semibold">Bloqueios</h3>
            <BlockersPanel blockers={data.blockers} />
          </Card>

          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Documentos</h3>
              {isUploading && <span className="text-xs text-slate-500">Enviando...</span>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {data.documents.map((doc) => (
                <div key={doc.id} className="space-y-2">
                  <DocumentCard document={doc} onUpload={handleUpload} />
                  <Button size="sm" variant="flat" onPress={() => setTransitionDocId(doc.id)}>
                    Transicionar status
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 space-y-4">
            <h3 className="font-semibold">Timeline</h3>
            <div className="space-y-3">
              {data.timeline.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-4 space-y-2">
            <h4 className="font-semibold">Participantes</h4>
            {data.participants.map((participant) => (
              <div key={participant.id} className="text-sm text-slate-600">
                {participant.name} · {participant.role}
              </div>
            ))}
          </Card>
          <Card className="p-4 space-y-2">
            <h4 className="font-semibold">Comentários (MVP)</h4>
            <p className="text-xs text-slate-500">TODO: menções e anexos.</p>
            <Button size="sm" variant="flat">
              Adicionar comentário
            </Button>
          </Card>
        </aside>
      </section>

      <input ref={fileRef} type="file" className="hidden" onChange={onFileChange} />

      <Modal isOpen={Boolean(transitionDocId)} onOpenChange={() => setTransitionDocId(null)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Transicionar documento</ModalHeader>
              <ModalBody>
                <Select
                  label="Novo status"
                  selectedKeys={[selectedStatus]}
                  onSelectionChange={(keys) => setSelectedStatus(Array.from(keys)[0] as string)}
                >
                  {statuses.map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    if (!transitionDocId) return;
                    await transitionDoc({ documentId: transitionDocId, status: selectedStatus });
                    onClose();
                  }}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
