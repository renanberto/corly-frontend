import { Card } from '@heroui/react';
import { Link } from 'react-router-dom';
import { useCasesListVM } from '@/presentation/viewmodels/useCasesVM';
import { LoadingSkeleton } from '@/presentation/components/LoadingSkeleton';

export const DashboardPage = () => {
  const { data, isLoading } = useCasesListVM({});
  const cases = data ?? [];
  const activeCases = cases.filter((item) => item.status !== 'DONE');
  const blockedCases = cases.filter((item) => item.status === 'BLOCKED');

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard operacional</h1>
        <p className="text-sm text-slate-500">Visão geral dos prazos e bloqueios ativos.</p>
      </header>
      {isLoading && <LoadingSkeleton lines={4} />}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1">
          <div className="text-xs text-slate-500">Casos ativos</div>
          <div className="text-2xl font-semibold text-slate-900">{activeCases.length}</div>
          <Link to="/app/cases" className="text-xs text-primary-600">
            Ver casos
          </Link>
        </Card>
        <Card className="p-4 space-y-1">
          <div className="text-xs text-slate-500">Casos bloqueados</div>
          <div className="text-2xl font-semibold text-slate-900">{blockedCases.length}</div>
          <Link to="/app/cases?status=BLOCKED" className="text-xs text-primary-600">
            Ver bloqueios
          </Link>
        </Card>
        <Card className="p-4 space-y-1">
          <div className="text-xs text-slate-500">Docs vencendo em 7 dias</div>
          <div className="text-2xl font-semibold text-slate-900">0</div>
          <Link to="/app/alerts" className="text-xs text-primary-600">
            Ver alertas
          </Link>
        </Card>
        <Card className="p-4 space-y-1">
          <div className="text-xs text-slate-500">Alertas não lidos</div>
          <div className="text-2xl font-semibold text-slate-900">0</div>
          <Link to="/app/alerts" className="text-xs text-primary-600">
            Abrir inbox
          </Link>
        </Card>
      </div>
    </div>
  );
};
