import { ReactNode } from 'react';

interface FilterChip {
  label: string;
  onRemove: () => void;
}

interface FilterBarProps {
  children: ReactNode;
  chips?: FilterChip[];
  onClear?: () => void;
  showClear?: boolean;
}

export const FilterBar = ({ children, chips = [], onClear, showClear }: FilterBarProps) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">{children}</div>
        {showClear && onClear && (
          <button
            className="ml-auto text-xs font-semibold text-primary-600 hover:text-primary-700"
            onClick={onClear}
          >
            Limpar filtros
          </button>
        )}
      </div>
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip.label}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
              onClick={chip.onRemove}
            >
              {chip.label}
              <span aria-hidden>×</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
