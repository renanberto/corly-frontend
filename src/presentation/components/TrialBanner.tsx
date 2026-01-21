import { Card } from '@heroui/react';
import { TrialUsage } from '@/domain/models';

export const TrialBanner = ({ trial }: { trial: TrialUsage }) => {
  return (
    <Card className="p-4 bg-slate-50 border border-slate-200">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-slate-900">
          {trial.isExpired ? 'Trial expirou' : `Trial termina em ${trial.daysRemaining} dias`}
        </div>
        <div className="text-xs text-slate-500">
          Uso: {trial.casesUsed} casos / {trial.documentsUsed} documentos / {trial.usersUsed} usuários
        </div>
        {trial.isExpired && (
          <div className="text-xs text-red-600">
            O ambiente está em modo leitura até a contratação de um plano.
          </div>
        )}
      </div>
    </Card>
  );
};
