import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { DashboardPage } from '@/presentation/pages/DashboardPage';
import { useCasesList } from '@/features/cases/queries';
import type { Case } from '@/domain/models';

vi.mock('@/features/cases/queries', () => ({
  useCasesList: vi.fn()
}));

const mockedUseCasesList = vi.mocked(useCasesList);

const sampleCases: Case[] = [
  {
    id: 'case-1',
    title: 'Operação Banco Aurora',
    status: 'OPEN',
    bank: 'Banco Aurora',
    dueAt: new Date().toISOString(),
    participants: [],
    blockers: [],
    documents: [],
    timeline: [
      {
        id: 'event-1',
        type: 'STATE_CHANGE',
        createdAt: new Date().toISOString(),
        description: 'Atualização'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Operação Banco Delta',
    status: 'BLOCKED',
    bank: 'Banco Delta',
    dueAt: new Date().toISOString(),
    participants: [],
    blockers: [
      {
        id: 'blocker-1',
        type: 'DOCUMENT',
        description: 'Documento pendente',
        startedAt: new Date().toISOString()
      }
    ],
    documents: [],
    timeline: [
      {
        id: 'event-2',
        type: 'ALERT',
        createdAt: new Date().toISOString(),
        description: 'Alerta'
      }
    ]
  }
];

const renderDashboard = () => {
  return render(<DashboardPage />);
};

describe('DashboardPage', () => {
  beforeEach(() => {
    mockedUseCasesList.mockReturnValue({
      data: sampleCases,
      isLoading: false,
      isError: false,
      refetch: vi.fn()
    });
  });

  it('renders the dashboard overview', () => {
    renderDashboard();

    expect(screen.getByText('Dashboard executivo')).toBeInTheDocument();
    expect(screen.getByText('Casos monitorados')).toBeInTheDocument();
    expect(screen.getByText('Casos prioritários')).toBeInTheDocument();
    expect(screen.getByText('Operação Banco Aurora')).toBeInTheDocument();
  });

  it('updates filters and calls the query hook with the new status', async () => {
    const user = userEvent.setup();
    renderDashboard();

    await user.selectOptions(screen.getByLabelText('Status'), 'BLOCKED');

    await waitFor(() => {
      expect(mockedUseCasesList).toHaveBeenLastCalledWith({ status: 'BLOCKED' });
    });
  });

  it('shows empty state when there are no cases', () => {
    mockedUseCasesList.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: vi.fn()
    });

    renderDashboard();

    expect(screen.getByText('Nenhum caso para este período')).toBeInTheDocument();
  });

  it('shows error state and retries', async () => {
    const refetch = vi.fn();
    mockedUseCasesList.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      refetch
    });

    const user = userEvent.setup();
    renderDashboard();

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));

    expect(refetch).toHaveBeenCalled();
  });
});
