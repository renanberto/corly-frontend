import { ReactNode } from 'react';

interface ErrorStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const ErrorState = ({ title, description, action }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
      <div className="text-sm font-semibold text-rose-700">{title}</div>
      {description && <div className="text-sm text-rose-600">{description}</div>}
      {action && <div>{action}</div>}
    </div>
  );
};
