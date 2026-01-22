import { Button, Card, Input, Select, SelectItem } from '@heroui/react';
import { useSearchParams } from 'react-router-dom';
import { useCasesList } from '@/features/cases/queries';
import { LoadingSkeleton } from '@/presentation/components/LoadingSkeleton';
import { StatusBadge } from '@/presentation/components/StatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';

const statusOptions = [
  { key: 'OPEN', label: 'Abertos' },
  { key: 'BLOCKED', label: 'Bloqueados' },
  { key: 'DONE', label: 'Finalizados' }
];

export const CasesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') ?? '';
  const blocked = searchParams.get('blocked') ?? '';
  const externalParty = searchParams.get('externalParty') ?? '';
  const { data, isLoading } = useCasesList({
    status: status || undefined,
    blocked: blocked ? blocked === 'true' : undefined,
    externalParty: externalParty || undefined
  });

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Casos</h1>
        <p className="text-sm text-slate-500">Acompanhe cada operação documental em tempo real.</p>
      </header>
      <Card className="p-4 grid md:grid-cols-4 gap-4">
        <Select
          label="Status"
          selectedKeys={status ? [status] : []}
          onSelectionChange={(keys) => handleFilter('status', Array.from(keys)[0] as string)}
        >
          {statusOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Bloqueado"
          selectedKeys={blocked ? [blocked] : []}
          onSelectionChange={(keys) => handleFilter('blocked', Array.from(keys)[0] as string)}
        >
          <SelectItem key="true">Sim</SelectItem>
          <SelectItem key="false">Não</SelectItem>
        </Select>
        <Input
          label="Banco"
          value={externalParty}
          onValueChange={(value) => handleFilter('externalParty', value)}
        />
        <Button variant="flat" onPress={() => setSearchParams({})}>
          Limpar filtros
        </Button>
      </Card>
      {isLoading && <LoadingSkeleton lines={4} />}
      {!isLoading && data?.length === 0 && (
        <EmptyState title="Nenhum caso encontrado" description="Ajuste os filtros ou crie um novo caso." />
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {data?.map((item) => (
          <Card key={item.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <div className="text-xs text-slate-500">Banco: {item.bank}</div>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <div className="text-xs text-slate-500">
              Bloqueios: {item.blockers.length} | Última atividade:{' '}
              {item.timeline[0]?.createdAt ? new Date(item.timeline[0].createdAt).toLocaleDateString() : '—'}
            </div>
            <div className="text-xs text-slate-500">
              Vencimento: {item.dueAt ? new Date(item.dueAt).toLocaleDateString() : '—'}
            </div>
            <Button as="a" href={`/app/cases/${item.id}`} size="sm" color="primary" variant="flat">
              Abrir caso
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
