import { Card } from '@heroui/react';
import { Blocker } from '@/domain/models';

export const BlockerCard = ({ blocker }: { blocker: Blocker }) => {
  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">{blocker.type}</div>
        <div className="text-xs text-slate-500">Desde {new Date(blocker.startedAt).toLocaleDateString()}</div>
      </div>
      <p className="text-sm text-slate-600">{blocker.description}</p>
      <div className="text-xs text-slate-500">
        Responsável: {blocker.assignedTo?.name ?? 'Não definido'}
      </div>
      {blocker.suggestedAction && (
        <div className="text-xs font-medium text-primary-600">Próximo passo: {blocker.suggestedAction}</div>
      )}
    </Card>
  );
};
