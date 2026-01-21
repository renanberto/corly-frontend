import { Button, Card, Input, Select, SelectItem } from '@heroui/react';
import { useState } from 'react';
import { useCreateCaseVM } from '@/presentation/viewmodels/useCasesVM';

const templates = [{ key: 'financiada', label: 'Compra Financiada' }];

export const OnboardingPage = () => {
  const [template, setTemplate] = useState('financiada');
  const [caseTitle, setCaseTitle] = useState('');
  const [bank, setBank] = useState('');
  const { mutateAsync, isPending } = useCreateCaseVM();

  const handleCreate = async () => {
    if (!caseTitle) return;
    await mutateAsync({ title: caseTitle, bank });
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Onboarding</h1>
        <p className="text-sm text-slate-500">
          Configure seu primeiro caso e convide o time (opcional).
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">1. Escolha o template inicial</h3>
          <Select
            label="Template"
            selectedKeys={[template]}
            onSelectionChange={(keys) => setTemplate(Array.from(keys)[0] as string)}
          >
            {templates.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </Card>
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">2. Convide usuários</h3>
          <Input label="Emails" placeholder="ex.: analista@empresa.com" />
          <Button variant="flat" size="sm">
            Enviar convite
          </Button>
        </Card>
        <Card className="p-6 space-y-4 md:col-span-2">
          <h3 className="font-semibold">3. Criar primeiro caso</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Título" value={caseTitle} onValueChange={setCaseTitle} />
            <Input label="Banco" value={bank} onValueChange={setBank} />
          </div>
          <Button color="primary" onPress={handleCreate} isLoading={isPending}>
            Criar caso
          </Button>
        </Card>
      </div>
    </div>
  );
};
