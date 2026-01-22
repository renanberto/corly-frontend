import { formatPercent } from '@/lib/format';

interface StatDeltaProps {
  value: number;
}

export const StatDelta = ({ value }: StatDeltaProps) => {
  const isPositive = value >= 0;
  const label = `${isPositive ? '+' : ''}${formatPercent(Math.abs(value))}`;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
        isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
      }`}
    >
      <span aria-hidden>{isPositive ? '▲' : '▼'}</span>
      {label}
    </span>
  );
};
