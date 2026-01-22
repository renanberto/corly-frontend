import { Button, Card } from '@heroui/react';
import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/app/PageHeader';
import { PageLayout } from '@/components/app/PageLayout';
import { Toolbar } from '@/components/app/Toolbar';
import { FilterBar } from '@/components/data-display/FilterBar';
import { DataTable } from '@/components/data-display/DataTable';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { StatDelta } from '@/components/dashboard/StatDelta';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { SkeletonBlock } from '@/components/feedback/SkeletonBlock';
import { formatCompactNumber, formatDate, formatPercent } from '@/lib/format';
import { useCasesList } from '@/features/cases/queries';
import { Case, CaseStatus } from '@/domain/models';

const periodOptions = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 90 dias' },
  { value: 'custom', label: 'Personalizado' }
];

const statusOptions: { value: CaseStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'Todos' },
  { value: 'OPEN', label: 'Abertos' },
  { value: 'BLOCKED', label: 'Bloqueados' },
  { value: 'DONE', label: 'Finalizados' }
];

const getLastActivity = (item: Case) => {
  return item.timeline[0]?.createdAt ?? item.dueAt ?? null;
};

const getRange = (period: string, customRange: { start?: string; end?: string }) => {
  if (period === 'custom' && customRange.start && customRange.end) {
    const start = new Date(customRange.start);
    const end = new Date(customRange.end);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));
    return { start, end, days };
  }

  const days = Number(period);
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  return { start, end, days };
};

const filterByRange = (cases: Case[], range: { start: Date; end: Date }) => {
  return cases.filter((item) => {
    const activity = getLastActivity(item);
    if (!activity) return false;
    const date = new Date(activity);
    return date >= range.start && date <= range.end;
  });
};

const buildTrend = (cases: Case[], range: { start: Date; end: Date }, buckets = 6) => {
  const bucketSize = Math.max(1, Math.ceil((range.end.getTime() - range.start.getTime()) / buckets));
  const counts = Array.from({ length: buckets }).fill(0);

  cases.forEach((item) => {
    const activity = getLastActivity(item);
    if (!activity) return;
    const date = new Date(activity).getTime();
    const index = Math.min(
      buckets - 1,
      Math.floor((date - range.start.getTime()) / bucketSize)
    );
    if (index >= 0) counts[index] += 1;
  });

  const max = Math.max(...counts, 1);
  return counts.map((value) => value / max);
};

const buildSeries = (cases: Case[], range: { start: Date; end: Date }) => {
  const buckets = 7;
  const bucketSize = Math.max(1, Math.ceil((range.end.getTime() - range.start.getTime()) / buckets));
  const results = Array.from({ length: buckets }).map((_, index) => {
    const start = new Date(range.start.getTime() + bucketSize * index);
    const end = new Date(
      index === buckets - 1 ? range.end.getTime() : range.start.getTime() + bucketSize * (index + 1)
    );
    return {
      label: start.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      value: 0,
      start,
      end
    };
  });

  cases.forEach((item) => {
    const activity = getLastActivity(item);
    if (!activity) return;
    const date = new Date(activity).getTime();
    const index = Math.min(
      buckets - 1,
      Math.floor((date - range.start.getTime()) / bucketSize)
    );
    if (index >= 0) results[index].value += 1;
  });

  return results;
};

const getDelta = (current: number, previous: number) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
};

export const DashboardPage = () => {
  const [period, setPeriod] = useState('30');
  const [status, setStatus] = useState<CaseStatus | 'ALL'>('ALL');
  const [customRange, setCustomRange] = useState<{ start?: string; end?: string }>({});
  const [search, setSearch] = useState('');
  const [selectedBucket, setSelectedBucket] = useState<number | null>(null);
  const { data, isLoading, isError, refetch } = useCasesList({
    status: status === 'ALL' ? undefined : status
  });

  const cases = data ?? [];
  const range = getRange(period, customRange);
  const periodCases = filterByRange(cases, range);
  const normalizedSearch = search.trim().toLowerCase();
  const matchesSearch = (item: Case) => {
    if (!normalizedSearch) return true;
    return (
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.bank.toLowerCase().includes(normalizedSearch)
    );
  };

  const baseFilteredCases = periodCases.filter((item) => {
    const statusMatch = status === 'ALL' ? true : item.status === status;
    return statusMatch && matchesSearch(item);
  });
  const timeSeries = buildSeries(baseFilteredCases, range);
  const bucketRange = selectedBucket !== null ? timeSeries[selectedBucket] : null;
  const filteredCases = baseFilteredCases.filter((item) => {
    if (!bucketRange) return true;
    const activity = getLastActivity(item);
    if (!activity) return false;
    const activityDate = new Date(activity);
    return activityDate >= bucketRange.start && activityDate <= bucketRange.end;
  });

  const previousRange = useMemo(() => {
    const end = new Date(range.start);
    const start = new Date(range.start);
    start.setDate(start.getDate() - range.days);
    return { start, end, days: range.days };
  }, [range]);

  const previousPeriodCases = filterByRange(cases, previousRange);
  const previousBaseCases = previousPeriodCases.filter((item) => {
    const statusMatch = status === 'ALL' ? true : item.status === status;
    return statusMatch && matchesSearch(item);
  });
  const previousTimeSeries = buildSeries(previousBaseCases, previousRange);
  const previousBucketRange = selectedBucket !== null ? previousTimeSeries[selectedBucket] : null;
  const previousCases = previousBaseCases.filter((item) => {
    if (!previousBucketRange) return true;
    const activity = getLastActivity(item);
    if (!activity) return false;
    const activityDate = new Date(activity);
    return activityDate >= previousBucketRange.start && activityDate <= previousBucketRange.end;
  });

  const totals = useMemo(() => {
    const total = filteredCases.length;
    const active = filteredCases.filter((item) => item.status !== 'DONE').length;
    const blocked = filteredCases.filter((item) => item.status === 'BLOCKED').length;
    const dueSoon = filteredCases.filter((item) => {
      if (!item.dueAt) return false;
      const dueDate = new Date(item.dueAt);
      const diff = dueDate.getTime() - Date.now();
      return diff > 0 && diff <= 7 * 86400000;
    }).length;
    return { total, active, blocked, dueSoon };
  }, [filteredCases]);

  const previousTotals = useMemo(() => {
    const total = previousCases.length;
    const active = previousCases.filter((item) => item.status !== 'DONE').length;
    const blocked = previousCases.filter((item) => item.status === 'BLOCKED').length;
    const dueSoon = previousCases.filter((item) => {
      if (!item.dueAt) return false;
      const dueDate = new Date(item.dueAt);
      const diff = dueDate.getTime() - range.start.getTime();
      return diff > 0 && diff <= 7 * 86400000;
    }).length;
    return { total, active, blocked, dueSoon };
  }, [previousCases, range.start]);

  const trend = buildTrend(filteredCases, range);
  const statusDistribution = statusOptions
    .filter((item) => item.value !== 'ALL')
    .map((option) => ({
      label: option.label,
      value: filteredCases.filter((item) => item.status === option.value).length,
      key: option.value
    }));

  const tableRows = filteredCases.map((item) => ({
    id: item.id,
    title: item.title,
    status: item.status,
    bank: item.bank,
    dueAt: item.dueAt,
    blockers: item.blockers.length,
    lastActivity: getLastActivity(item)
  }));

  const activeFilters = [
    status !== 'ALL' ? `Status: ${statusOptions.find((item) => item.value === status)?.label}` : null,
    period !== '30' ? `Período: ${periodOptions.find((item) => item.value === period)?.label}` : null,
    period === 'custom' && customRange.start && customRange.end
      ? `Custom: ${formatDate(customRange.start)} - ${formatDate(customRange.end)}`
      : null,
    selectedBucket !== null && timeSeries[selectedBucket]
      ? `Dia: ${timeSeries[selectedBucket].label}`
      : null,
    normalizedSearch ? `Busca: ${search.trim()}` : null
  ].filter(Boolean) as string[];

  const clearFilters = () => {
    setStatus('ALL');
    setPeriod('30');
    setCustomRange({});
    setSearch('');
    setSelectedBucket(null);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Dashboard executivo"
        description="Acompanhe o ritmo das operações, gargalos e resultados recentes."
        action={
          <Button size="sm" color="primary">
            Exportar relatório
          </Button>
        }
      />

      <Toolbar
        secondary={
          <Button size="sm" variant="flat" onPress={() => refetch()}>
            Atualizar dados
          </Button>
        }
      >
        <div className="text-xs text-slate-500">Última atualização: {formatDate(new Date())}</div>
      </Toolbar>

      {/* UX note: filtros e KPIs convivem para reduzir esforço cognitivo e acelerar decisões. */}
      <FilterBar
        showClear={activeFilters.length > 0}
        onClear={clearFilters}
        chips={activeFilters.map((label) => ({
          label,
          onRemove: () => {
            if (label.startsWith('Status')) setStatus('ALL');
            if (label.startsWith('Período') || label.startsWith('Custom')) {
              setPeriod('30');
              setCustomRange({});
              setSelectedBucket(null);
            }
            if (label.startsWith('Dia')) setSelectedBucket(null);
            if (label.startsWith('Busca')) setSearch('');
          }
        }))}
      >
        <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600">
          Busca
          <input
            type="search"
            aria-label="Busca"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Caso, banco ou palavra-chave"
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 placeholder:text-slate-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600">
          Período
          <select
            aria-label="Período"
            value={period}
            onChange={(event) => {
              setPeriod(event.target.value);
              setSelectedBucket(null);
            }}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {period === 'custom' && (
          <div className="flex flex-wrap items-end gap-2">
            <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600">
              Início
              <input
                type="date"
                value={customRange.start ?? ''}
                onChange={(event) => {
                  setCustomRange((prev) => ({ ...prev, start: event.target.value }));
                  setSelectedBucket(null);
                }}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600">
              Fim
              <input
                type="date"
                value={customRange.end ?? ''}
                onChange={(event) => {
                  setCustomRange((prev) => ({ ...prev, end: event.target.value }));
                  setSelectedBucket(null);
                }}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700"
              />
            </label>
          </div>
        )}

        <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600">
          Status
          <select
            aria-label="Status"
            value={status}
            onChange={(event) => setStatus(event.target.value as CaseStatus | 'ALL')}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </FilterBar>

      {isError && (
        <ErrorState
          title="Não foi possível carregar o dashboard"
          description="Verifique sua conexão e tente novamente."
          action={
            <Button size="sm" color="primary" onPress={() => refetch()}>
              Tentar novamente
            </Button>
          }
        />
      )}

      {isLoading && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonBlock key={`kpi-${index}`} className="h-32" />
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <SkeletonBlock className="h-72 lg:col-span-2" />
            <SkeletonBlock className="h-72" />
          </div>
          <SkeletonBlock className="h-64" />
        </div>
      )}

      {!isLoading && !isError && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              title="Casos monitorados"
              value={formatCompactNumber(totals.total)}
              delta={<StatDelta value={getDelta(totals.total, previousTotals.total)} />}
              deltaLabel="vs período anterior"
              hint="Total de casos com atividade recente no período selecionado."
              trend={trend}
              onClick={() => setStatus('ALL')}
            />
            <KpiCard
              title="Casos ativos"
              value={formatCompactNumber(totals.active)}
              delta={<StatDelta value={getDelta(totals.active, previousTotals.active)} />}
              deltaLabel="vs período anterior"
              hint="Casos em andamento que precisam de atenção."
              trend={trend}
              onClick={() => setStatus('OPEN')}
            />
            <KpiCard
              title="Casos bloqueados"
              value={formatCompactNumber(totals.blocked)}
              delta={<StatDelta value={getDelta(totals.blocked, previousTotals.blocked)} />}
              deltaLabel="vs período anterior"
              hint="Bloqueios críticos que exigem intervenção."
              trend={trend}
              onClick={() => setStatus('BLOCKED')}
            />
            <KpiCard
              title="Vencendo em 7 dias"
              value={formatCompactNumber(totals.dueSoon)}
              delta={<StatDelta value={getDelta(totals.dueSoon, previousTotals.dueSoon)} />}
              deltaLabel="vs período anterior"
              hint="Casos com vencimento próximo e prioridade alta."
              trend={trend}
              onClick={() => setStatus('OPEN')}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Atividade no período</div>
                  <div className="text-xs text-slate-500">
                    Casos com movimentações por data (clique para filtrar)
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  Total no período: {formatCompactNumber(baseFilteredCases.length)}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-7 gap-3 text-center text-xs text-slate-500">
                {timeSeries.map((item, index) => (
                  <button
                    key={item.label}
                    className={`flex flex-col items-center gap-2 rounded-xl px-1 py-2 transition ${
                      selectedBucket === index ? 'bg-slate-50 text-slate-900' : ''
                    }`}
                    onClick={() => setSelectedBucket((prev) => (prev === index ? null : index))}
                    aria-pressed={selectedBucket === index}
                  >
                    <div className="flex h-28 w-full items-end justify-center rounded-xl bg-slate-50">
                      <span
                        className={`w-4 rounded-full ${
                          selectedBucket === index ? 'bg-primary-500' : 'bg-primary-400'
                        }`}
                        style={{ height: `${Math.max(12, item.value * 14)}px` }}
                        aria-label={`${item.label}: ${item.value} casos`}
                      />
                    </div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-sm font-semibold text-slate-900">Distribuição por status</div>
              <div className="text-xs text-slate-500">Clique para filtrar a tabela abaixo</div>
              <div className="mt-6 space-y-3">
                {statusDistribution.map((item) => (
                  <button
                    key={item.key}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm text-slate-600 transition ${
                      status === item.key
                        ? 'border-primary-200 bg-primary-50 text-slate-900'
                        : 'border-slate-100 hover:border-primary-200'
                    }`}
                    onClick={() => setStatus(item.key)}
                  >
                    <span>{item.label}</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {formatCompactNumber(item.value)}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Taxa de bloqueios: {formatPercent(totals.blocked === 0 ? 0 : (totals.blocked / totals.total) * 100)}
              </div>
            </Card>
          </div>

          {filteredCases.length === 0 ? (
            <EmptyState
              title="Nenhum caso para este período"
              description="Tente ajustar o range ou remover filtros para visualizar atividades recentes."
              action={
                <Button size="sm" color="primary" onPress={clearFilters}>
                  Ver tudo
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Casos prioritários</div>
                  <div className="text-xs text-slate-500">
                    Drill-down automático conforme filtros e KPIs.
                  </div>
                </div>
                <div className="text-xs text-slate-500">{formatCompactNumber(filteredCases.length)} casos</div>
              </div>
              <DataTable
                data={tableRows}
                columns={[
                  {
                    key: 'title',
                    header: 'Caso',
                    sortable: true,
                    render: (row) => (
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{row.title}</div>
                        <div className="text-xs text-slate-500">Banco: {row.bank}</div>
                      </div>
                    )
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    sortable: true,
                    render: (row) => (
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          row.status === 'BLOCKED'
                            ? 'bg-rose-50 text-rose-700'
                            : row.status === 'DONE'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    )
                  },
                  {
                    key: 'blockers',
                    header: 'Bloqueios',
                    sortable: true
                  },
                  {
                    key: 'dueAt',
                    header: 'Vencimento',
                    sortable: true,
                    render: (row) => (row.dueAt ? formatDate(row.dueAt) : '—')
                  },
                  {
                    key: 'lastActivity',
                    header: 'Última atividade',
                    sortable: true,
                    render: (row) => (row.lastActivity ? formatDate(row.lastActivity) : '—')
                  }
                ]}
                rowActions={(row) => [
                  { label: 'Abrir', onClick: () => window.location.assign(`/app/cases/${row.id}`) }
                ]}
                emptyTitle="Sem casos para exibir"
                emptyDescription="Altere o status ou o período para visualizar novos itens."
              />
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};
