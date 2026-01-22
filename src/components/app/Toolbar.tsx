import { ReactNode } from 'react';

interface ToolbarProps {
  children: ReactNode;
  secondary?: ReactNode;
}

export const Toolbar = ({ children, secondary }: ToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">{children}</div>
      {secondary && <div className="flex items-center gap-2">{secondary}</div>}
    </div>
  );
};
