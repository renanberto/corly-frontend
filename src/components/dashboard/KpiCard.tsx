import { ReactNode } from 'react';
import { Card } from '@heroui/react';

interface KpiCardProps {
  title: string;
  value: ReactNode;
  delta?: ReactNode;
  deltaLabel?: string;
  hint?: string;
  trend?: number[];
  onClick?: () => void;
}

export const KpiCard = ({
  title,
  value,
  delta,
  deltaLabel,
  hint,
  trend = [],
  onClick
}: KpiCardProps) => {
  return (
    <Card
      className={`group p-4 transition-shadow motion-safe:duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary-300' : ''
      }`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick();
        }
      }}
      title={hint}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</div>
          <div className="text-2xl font-semibold text-slate-900">{value}</div>
          {delta && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {delta}
              {deltaLabel && <span>{deltaLabel}</span>}
            </div>
          )}
        </div>
        <div className="flex items-end gap-1">
          {trend.length > 0
            ? trend.map((point, index) => (
                <span
                  key={`${title}-trend-${index}`}
                  className="w-1.5 rounded-full bg-primary-200"
                  style={{ height: `${8 + point * 18}px` }}
                />
              ))
            : null}
        </div>
      </div>
      {hint && <div className="mt-3 text-xs text-slate-500">{hint}</div>}
    </Card>
  );
};
