import { Card } from '@heroui/react';

const items = [
  {
    title: 'Fim dos gargalos invisíveis',
    description: 'Centralize documentos, pendências e bloqueios com responsáveis claros.',
    accent: 'bg-indigo-500'
  },
  {
    title: 'Fluxos auditáveis',
    description: 'Timeline automática com tudo o que mudou, quando e por quem.',
    accent: 'bg-emerald-500'
  },
  {
    title: 'Prazos sob controle',
    description: 'Alertas preventivos para evitar multas, atrasos e retrabalho.',
    accent: 'bg-amber-500'
  },
  {
    title: 'Integração com seu time',
    description: 'Perfis e permissões para bancos, corretores e backoffice.',
    accent: 'bg-slate-500'
  }
];

export const ValueProps = () => {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Valor imediato</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Clareza operacional para decisões mais rápidas.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.title} className="p-6 space-y-3 border border-slate-200/70 shadow-sm">
            <div className="flex items-center gap-3">
              <span className={`h-10 w-10 rounded-xl ${item.accent} opacity-90`} />
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            </div>
            <p className="text-sm text-slate-600">{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};
