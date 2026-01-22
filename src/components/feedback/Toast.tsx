import { ReactNode } from 'react';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'success' | 'warning' | 'error';
  onDismiss?: () => void;
  action?: ReactNode;
}

export const Toast = ({ title, description, variant = 'success', onDismiss, action }: ToastProps) => {
  const styles = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
    error: 'border-rose-200 bg-rose-50 text-rose-700'
  };

  return (
    <div className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-sm ${styles[variant]}`}>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        {description && <div className="text-xs opacity-80">{description}</div>}
      </div>
      {action}
      {onDismiss && (
        <button className="text-xs font-semibold" onClick={onDismiss} aria-label="Fechar toast">
          ✕
        </button>
      )}
    </div>
  );
};
