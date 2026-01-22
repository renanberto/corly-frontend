import { Button, Card } from '@heroui/react';
import { EmptyState } from '@/components/feedback/EmptyState';

const alerts = [
  {
    id: '1',
    message: 'RG do comprador vence em 5 dias',
    createdAt: new Date().toISOString(),
    read: false
  }
];

export const AlertsPage = () => {
  if (!alerts.length) {
    return (
      <EmptyState title="Sem alertas" description="Nenhuma pendência crítica no momento." />
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Alertas</h1>
        <p className="text-sm text-slate-500">Acompanhe vencimentos e bloqueios críticos.</p>
      </header>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-900">{alert.message}</div>
              <div className="text-xs text-slate-500">
                {new Date(alert.createdAt).toLocaleString()}
              </div>
            </div>
            <Button size="sm" variant="flat">
              Marcar como lido
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
