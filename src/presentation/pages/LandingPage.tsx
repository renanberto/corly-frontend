import { Button, Card } from '@heroui/react';
import { Link } from 'react-router-dom';
import { usePublicPlansVM } from '@/presentation/viewmodels/usePublicPlansVM';
import { LoadingSkeleton } from '@/presentation/components/LoadingSkeleton';

export const LandingPage = () => {
  const { data, isLoading } = usePublicPlansVM();

  return (
    <div className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">Orquestração documental</p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Operações imobiliárias sem surpresas: documentação, bloqueios e prazos no mesmo fluxo.
          </h1>
          <p className="text-base text-slate-600">
            O Corly organiza o caminho entre corretor, correspondente, banco e imobiliária com visibilidade
            contínua de dependências, responsáveis e próximos passos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as={Link} to="/signup" color="primary">
              Começar trial
            </Button>
            <Button as={Link} to="/pricing" variant="flat">
              Ver planos
            </Button>
          </div>
        </div>
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Resumo do trial</h3>
          {isLoading && <LoadingSkeleton lines={4} />}
          {data && (
            <div className="text-sm text-slate-600 space-y-2">
              <div>Trial de {data.trialDays} dias para validar o fluxo completo.</div>
              <div>
                Limites: {data.limits.cases} casos, {data.limits.documents} documentos, {data.limits.users} usuários.
              </div>
              <div>Sem cartão de crédito. Ativação imediata.</div>
            </div>
          )}
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Como funciona</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: 'Mapeie dependências',
              description: 'Registre bancos, corretores, documentos e pendências com responsáveis claros.'
            },
            {
              title: 'Acompanhe bloqueios',
              description: 'Cada bloqueio aparece com data de início, impacto e próximo passo sugerido.'
            },
            {
              title: 'Controle prazos',
              description: 'Alertas e vencimentos centralizados, sem planilhas paralelas.'
            }
          ].map((item) => (
            <Card key={item.title} className="p-5 space-y-2">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">O que você vê</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: 'Painel de bloqueios',
              description: 'Lista viva com tempo aberto, responsável e ação sugerida.'
            },
            {
              title: 'Documentos vivos',
              description: 'Status, validade, versões e pendências para cada documento.'
            },
            {
              title: 'Timeline operacional',
              description: 'Tudo o que mudou em ordem cronológica, para auditoria instantânea.'
            }
          ].map((item) => (
            <Card key={item.title} className="p-5 space-y-2">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-[1.5fr_1fr] gap-6 items-start">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Perguntas rápidas</h2>
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold">O trial inclui integrações?</h4>
              <p className="text-sm text-slate-600">
                Sim. Você testa todo o fluxo com upload presigned, dependências e alertas.
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold">É um CRM?</h4>
              <p className="text-sm text-slate-600">
                Não. O foco é operação documental e compliance, não pipeline de vendas.
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold">Consigo limitar acesso?</h4>
              <p className="text-sm text-slate-600">
                Sim. Permissões por perfil e bloqueios visíveis apenas para quem precisa agir.
              </p>
            </Card>
          </div>
        </div>
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Pronto para destravar seu fluxo?</h3>
          <p className="text-sm text-slate-600">
            Ative o trial e configure seu primeiro caso em minutos.
          </p>
          <Button as={Link} to="/signup" color="primary">
            Criar conta
          </Button>
        </Card>
      </section>
    </div>
  );
};
