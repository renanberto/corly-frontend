import { Button, Card, Input } from '@heroui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useSignupVM } from '@/presentation/viewmodels/useAuthVM';

const schema = z.object({
  companyName: z.string().min(2, 'Informe o nome da empresa'),
  name: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres')
});

type FormValues = z.infer<typeof schema>;

type TrialSignupFormProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  supportText: string;
  id?: string;
  compact?: boolean;
};

export const TrialSignupForm = ({
  title,
  subtitle,
  buttonLabel,
  supportText,
  id,
  compact = false
}: TrialSignupFormProps) => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSignupVM();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setErrorMessage(null);
    try {
      await mutateAsync(values);
      navigate('/app/onboarding');
    } catch (error) {
      setErrorMessage('Não foi possível iniciar o trial agora. Tente novamente em instantes.');
    }
  };

  return (
    <Card id={id} className="p-6 shadow-medium border border-slate-200/70 bg-white/90">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Trial premium</p>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>
      <form className="mt-5 grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className={compact ? 'grid gap-3 md:grid-cols-2' : 'grid gap-3'}>
          <Input label="Empresa" {...register('companyName')} errorMessage={errors.companyName?.message} />
          <Input label="Nome" {...register('name')} errorMessage={errors.name?.message} />
        </div>
        <div className={compact ? 'grid gap-3 md:grid-cols-2' : 'grid gap-3'}>
          <Input label="Email" type="email" {...register('email')} errorMessage={errors.email?.message} />
          <Input
            label="Senha"
            type="password"
            {...register('password')}
            errorMessage={errors.password?.message}
          />
        </div>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        <Button color="primary" type="submit" isLoading={isPending} className="w-full">
          {buttonLabel}
        </Button>
        <p className="text-xs text-slate-500">{supportText}</p>
      </form>
    </Card>
  );
};
