import { Button, Card } from '@heroui/react';
import { Document } from '@/domain/models';
import { StatusBadge } from '@/presentation/components/StatusBadge';

export const DocumentCard = ({
  document,
  onUpload
}: {
  document: Document;
  onUpload: (id: string) => void;
}) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{document.title}</h4>
          <p className="text-xs text-slate-500">{document.type}</p>
        </div>
        <StatusBadge status={document.status} />
      </div>
      <div className="text-xs text-slate-500 space-y-1">
        <div>Dono: {document.owner.name}</div>
        <div>Responsável: {document.responsible.name}</div>
        {document.dueAt && <div>Entrega até: {new Date(document.dueAt).toLocaleDateString()}</div>}
        {document.expiresAt && (
          <div>Expira em: {new Date(document.expiresAt).toLocaleDateString()}</div>
        )}
      </div>
      <Button size="sm" color="primary" onPress={() => onUpload(document.id)}>
        Enviar nova versão
      </Button>
    </Card>
  );
};
