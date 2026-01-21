import { render, screen } from '@testing-library/react';
import { TrialBanner } from '@/presentation/components/TrialBanner';

const trial = {
  daysRemaining: 5,
  casesUsed: 2,
  documentsUsed: 10,
  usersUsed: 3,
  isExpired: false
};

describe('TrialBanner', () => {
  it('exibe contador de dias restantes', () => {
    render(<TrialBanner trial={trial} />);
    expect(screen.getByText(/Trial termina em 5 dias/)).toBeInTheDocument();
  });
});
