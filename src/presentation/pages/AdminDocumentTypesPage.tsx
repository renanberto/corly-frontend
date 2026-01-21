import { Button, Card, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

const documentTypes = [
  { id: '1', name: 'RG', required: true },
  { id: '2', name: 'Comprovante de renda', required: true }
];

export const AdminDocumentTypesPage = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Tipos de documento</h1>
        <p className="text-sm text-slate-500">Gerencie o catálogo de documentos obrigatórios.</p>
      </header>
      <Card className="p-4 space-y-4">
        <div className="flex flex-wrap gap-4">
          <Input label="Novo tipo" placeholder="Ex.: Certidão" />
          <Button color="primary">Adicionar</Button>
        </div>
        <Table aria-label="Tipos de documento">
          <TableHeader>
            <TableColumn>Nome</TableColumn>
            <TableColumn>Obrigatório</TableColumn>
            <TableColumn>Ações</TableColumn>
          </TableHeader>
          <TableBody>
            {documentTypes.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.required ? 'Sim' : 'Não'}</TableCell>
                <TableCell>
                  <Button size="sm" variant="flat">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
