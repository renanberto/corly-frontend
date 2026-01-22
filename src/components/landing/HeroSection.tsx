import { Button, Chip } from '@heroui/react';
import { LoadingSkeleton } from '@/presentation/components/LoadingSkeleton';
import { TrialSignupForm } from '@/components/landing/TrialSignupForm';

type HeroSectionProps = {
  trialDays?: number;
  trialLimits?: {
    max_cases: number;
    max_documents: number;
    max_users: number;
  };
  isLoading?: boolean;
};

export const HeroSection = ({ trialDays, trialLimits, isLoading }: HeroSectionProps) => {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
      <div className="space-y-6">
        <Chip color="primary" variant="flat" className="bg-indigo-50 text-indigo-600">
          Automação documental para operações imobiliárias
        </Chip>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
            Controle total da documentação com visibilidade em tempo real.
          </h1>
          <p className="text-base md:text-lg text-slate-600">
            O Corly conecta bancos, corretores e times internos em um painel único de bloqueios,
            prazos e responsáveis — sem planilhas ou e-mails desconectados.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button as="a" href="#trial" color="primary" size="lg">
            Começar trial grátis
          </Button>
          <Button as="a" href="#como-funciona" variant="flat" size="lg">
            Ver como funciona
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Ativação em minutos
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Sem cartão de crédito
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Segurança em nível bancário
          </span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-900">Resumo do trial</p>
          {isLoading && <LoadingSkeleton lines={2} />}
          {!isLoading && (
            <div className="mt-2 text-sm text-slate-600 space-y-1">
              <p>{trialDays ? `${trialDays} dias grátis para testar o fluxo completo.` : 'Trial completo com ativação imediata.'}</p>
              {trialLimits && (
                <p>
                  {trialLimits.max_cases} casos, {trialLimits.max_documents} documentos, {trialLimits.max_users} usuários.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-10 -right-8 h-40 w-40 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -bottom-12 -left-10 h-48 w-48 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="relative rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Dashboard Corly</p>
              <h3 className="text-lg font-semibold text-slate-900">Operações monitoradas</h3>
            </div>
            <Chip size="sm" color="success" variant="flat">
              Live
            </Chip>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Casos ativos', value: '128' },
                { label: 'Bloqueios', value: '14' },
                { label: 'SLA em dia', value: '92%' }
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-white">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-300">
                <span>Fluxo crítico</span>
                <span>Atualizado agora</span>
              </div>
              <div className="mt-3 space-y-3">
                {[
                  { title: 'Contrato de financiamento', status: 'Assinatura pendente', progress: '72%' },
                  { title: 'Registro no cartório', status: 'Documentos enviados', progress: '54%' }
                ].map((item) => (
                  <div key={item.title} className="rounded-xl bg-slate-800/60 p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.title}</span>
                      <span className="text-emerald-300">{item.progress}</span>
                    </div>
                    <p className="text-xs text-slate-300">{item.status}</p>
                    <div className="mt-2 h-1 w-full rounded-full bg-slate-700">
                      <div className="h-1 w-2/3 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <TrialSignupForm
            id="trial"
            title="Ative seu trial completo"
            subtitle="Crie sua conta e tenha controle imediato da documentação crítica."
            buttonLabel="Iniciar trial grátis"
            supportText="Sem cartão. Cancelamento em qualquer momento."
          />
        </div>
      </div>
    </section>
  );
};
