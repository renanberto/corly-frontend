import { Blocker } from '@/domain/models';
import { BlockerCard } from '@/presentation/components/BlockerCard';
import { EmptyState } from '@/presentation/components/EmptyState';

export const BlockersPanel = ({ blockers }: { blockers: Blocker[] }) => {
  if (!blockers.length) {
    return (
      <EmptyState
        title="Sem bloqueios ativos"
        description="Seu caso está fluindo. Continue acompanhando as dependências para evitar atrasos."
      />
    );
  }

  return (
    <div className="space-y-3">
      {blockers.map((blocker) => (
        <BlockerCard key={blocker.id} blocker={blocker} />
      ))}
    </div>
  );
};
