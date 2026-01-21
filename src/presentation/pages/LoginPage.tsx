import { Button, Card, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLoginVM } from '@/presentation/viewmodels/useAuthVM';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres')
});

type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLoginVM();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    await mutateAsync(values);
    navigate('/app/dashboard');
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Entrar</h1>
          <p className="text-sm text-slate-500">Acompanhe seus casos ativos.</p>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" {...register('email')} errorMessage={errors.email?.message} />
          <Input
            label="Senha"
            type="password"
            {...register('password')}
            errorMessage={errors.password?.message}
          />
          <Button color="primary" type="submit" isLoading={isPending}>
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};
