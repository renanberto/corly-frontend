import { Card } from '@heroui/react';

const steps = [
  {
    step: '01',
    title: 'Crie sua conta e inicie o trial',
    description: 'Cadastre sua operação e já tenha acesso ao painel completo.'
  },
  {
    step: '02',
    title: 'Configure o fluxo em minutos',
    description: 'Defina responsáveis, prazos e documentos com modelos prontos.'
  },
  {
    step: '03',
    title: 'Gere valor desde o primeiro dia',
    description: 'Acompanhe bloqueios críticos e destrave etapas com alertas inteligentes.'
  }
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Como funciona</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Um fluxo guiado para acelerar sua operação.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((item) => (
          <Card key={item.step} className="p-6 space-y-3 border border-slate-200/70 shadow-sm">
            <span className="text-xs font-semibold text-indigo-600">Etapa {item.step}</span>
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};
