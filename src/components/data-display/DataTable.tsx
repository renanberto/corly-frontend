import { ReactNode, useMemo, useState } from 'react';
import { EmptyState } from '@/components/feedback/EmptyState';

interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
}

interface RowAction<T> {
  label: string;
  onClick: (row: T) => void;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  rowActions?: (row: T) => RowAction<T>[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export const DataTable = <T extends { id: string }>({
  data,
  columns,
  pageSize = 6,
  rowActions,
  emptyTitle = 'Sem resultados',
  emptyDescription = 'Ajuste os filtros para ver novos dados.'
}: DataTableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const column = columns.find((item) => item.key === sortKey);
    if (!column) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = column.sortValue ? column.sortValue(a) : (a as Record<string, unknown>)[sortKey];
      const bValue = column.sortValue ? column.sortValue(b) : (b as Record<string, unknown>)[sortKey];

      if (aValue === bValue) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      return aValue > bValue ? 1 : -1;
    });

    return sortDirection === 'asc' ? sorted : sorted.reverse();
  }, [columns, data, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={`px-4 py-3 text-left ${column.className ?? ''}`}>
                  {column.sortable ? (
                    <button
                      className="inline-flex items-center gap-1 text-left"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.header}
                      <span className="text-[10px]">
                        {sortKey === column.key ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
              {rowActions && <th className="px-4 py-3 text-right">Ações</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-3 ${column.className ?? ''}`}>
                    {column.render ? column.render(row) : (row as Record<string, ReactNode>)[column.key]}
                  </td>
                ))}
                {rowActions && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {rowActions(row).map((action) => (
                        <button
                          key={action.label}
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-primary-200 hover:text-primary-600"
                          onClick={() => action.onClick(row)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Página {page} de {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <button
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 disabled:opacity-50"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};
