import { ReactNode } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  footer?: ReactNode;
}

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  footer
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {description && <p className="text-sm text-slate-600">{description}</p>}
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          {footer ?? (
            <>
              <button
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                onClick={onCancel}
              >
                {cancelLabel}
              </button>
              <button
                className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
