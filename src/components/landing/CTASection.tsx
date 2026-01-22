import { TrialSignupForm } from '@/components/landing/TrialSignupForm';

type CTASectionProps = {
  trialDays?: number;
};

export const CTASection = ({ trialDays }: CTASectionProps) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-8 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Comece agora</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Transforme sua operação documental em um fluxo previsível.
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            {trialDays
              ? `${trialDays} dias grátis para colocar times, bancos e corretores na mesma visão.`
              : 'Trial completo para validar o impacto antes de contratar.'}
          </p>
        </div>
        <TrialSignupForm
          title="Crie sua conta agora"
          subtitle="Leve sua operação para o Corly em menos de 5 minutos."
          buttonLabel="Começar trial grátis"
          supportText="Sem cartão. Suporte humano desde o primeiro acesso."
          compact
        />
      </div>
    </section>
  );
};
