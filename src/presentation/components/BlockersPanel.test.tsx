import { render, screen } from '@testing-library/react';
import { BlockersPanel } from '@/presentation/components/BlockersPanel';

const blocker = {
  id: '1',
  type: 'DOCUMENT',
  description: 'RG pendente',
  startedAt: new Date().toISOString(),
  assignedTo: { id: '1', name: 'Ana', role: 'Analista' }
};

describe('BlockersPanel', () => {
  it('renderiza estado vazio', () => {
    render(<BlockersPanel blockers={[]} />);
    expect(screen.getByText('Sem bloqueios ativos')).toBeInTheDocument();
  });

  it('renderiza lista de bloqueios', () => {
    render(<BlockersPanel blockers={[blocker]} />);
    expect(screen.getByText('RG pendente')).toBeInTheDocument();
  });
});
