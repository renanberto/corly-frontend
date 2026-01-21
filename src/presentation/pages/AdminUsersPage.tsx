import { Button, Card, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

const users = [
  { id: '1', name: 'Ana Souza', email: 'ana@empresa.com', role: 'Operações' },
  { id: '2', name: 'Carlos Lima', email: 'carlos@empresa.com', role: 'Admin' }
];

export const AdminUsersPage = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Usuários</h1>
        <p className="text-sm text-slate-500">Convide e gerencie acessos ao ambiente.</p>
      </header>
      <Card className="p-4 space-y-4">
        <div className="flex flex-wrap gap-4">
          <Input label="Email" placeholder="usuario@empresa.com" />
          <Button color="primary">Enviar convite</Button>
        </div>
        <Table aria-label="Usuários">
          <TableHeader>
            <TableColumn>Nome</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Perfil</TableColumn>
            <TableColumn>Ações</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button size="sm" variant="flat">
                    Gerenciar
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
