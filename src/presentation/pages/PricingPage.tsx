import { Card } from '@heroui/react';
import { usePublicPlansVM } from '@/presentation/viewmodels/usePublicPlansVM';
import { LoadingSkeleton } from '@/presentation/components/LoadingSkeleton';

export const PricingPage = () => {
  const { data, isLoading } = usePublicPlansVM();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Planos e trial</h1>
        <p className="text-sm text-slate-600">
          Comece com um trial completo e desbloqueie planos pagos quando precisar.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3">
          <h3 className="text-lg font-semibold">Trial</h3>
          {isLoading && <LoadingSkeleton lines={4} />}
          {data && (
            <div className="space-y-2 text-sm text-slate-600">
              <p>{data.trialDays} dias para testar o fluxo completo.</p>
              <ul className="list-disc list-inside">
                <li>{data.trial_limits.max_cases} casos ativos</li>
                <li>{data.trial_limits.max_documents} documentos em gestão</li>
                <li>{data.trial_limits.max_users} usuários</li>
              </ul>
            </div>
          )}
        </Card>
        <Card className="p-6 space-y-3">
          <h3 className="text-lg font-semibold">Planos pagos</h3>
          <p className="text-sm text-slate-600">
            Em breve: planos por volume de casos, integrações bancárias e SLAs configuráveis.
          </p>
          <div className="text-xs text-slate-500">Solicite uma demonstração para early access.</div>
        </Card>
      </div>
    </div>
  );
};
