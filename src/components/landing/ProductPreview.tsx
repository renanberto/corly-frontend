import { Card, Chip } from '@heroui/react';

const previewItems = [
  {
    title: 'Dashboard executivo',
    description: 'KPIs, SLAs e alertas críticos em um painel único.'
  },
  {
    title: 'Listas inteligentes',
    description: 'Casos filtrados por bloqueio, responsável e status.'
  },
  {
    title: 'Fluxos documentais',
    description: 'Organize documentos por tipo, versão e data de validade.'
  }
];

export const ProductPreview = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Preview do produto</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Um cockpit operacional para todas as etapas.
          </h2>
        </div>
        <Chip color="primary" variant="flat">
          Demo read-only
        </Chip>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="relative overflow-hidden border border-slate-200/70 p-6 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-emerald-50" />
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pipeline ativo</p>
                <h3 className="text-lg font-semibold text-slate-900">Casos em andamento</h3>
              </div>
              <span className="text-xs text-slate-500">Atualizado há 2 min</span>
            </div>
            <div className="grid gap-3">
              {[
                {
                  title: 'Residencial Vista Azul',
                  status: 'Bloqueio: certidão vencida',
                  color: 'text-amber-600'
                },
                {
                  title: 'Condomínio Aurora',
                  status: 'Em aprovação bancária',
                  color: 'text-emerald-600'
                },
                {
                  title: 'Loteamento Horizonte',
                  status: 'Assinatura digital pendente',
                  color: 'text-indigo-600'
                }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Responsável: Ana Paula</span>
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span>Prazo em 5 dias</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="grid gap-4">
          {previewItems.map((item) => (
            <Card key={item.title} className="p-5 space-y-2 border border-slate-200/70 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </Card>
          ))}
          <Card className="p-5 border border-slate-200/70 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Alertas críticos</p>
                <h4 className="text-lg font-semibold text-slate-900">7 itens exigindo ação</h4>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">Prioridade alta</span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                'Certidões vencidas em 3 casos',
                'Pendências de assinatura digital',
                'Cadastro bancário incompleto'
              ].map((text) => (
                <div key={text} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  {text}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
