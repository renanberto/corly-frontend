import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
      <div className="text-sm font-semibold text-slate-700">{title}</div>
      {description && <div className="text-sm text-slate-500">{description}</div>}
      {action && <div>{action}</div>}
    </div>
  );
};
