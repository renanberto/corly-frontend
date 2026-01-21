import { Card } from '@heroui/react';
import { Link } from 'react-router-dom';

export const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="p-6 space-y-3">
        <h1 className="text-xl font-semibold">Acesso negado</h1>
        <p className="text-sm text-slate-500">
          Você não tem permissão para acessar esta área.
        </p>
        <Link to="/app/dashboard" className="text-sm text-primary-600">
          Voltar ao dashboard
        </Link>
      </Card>
    </div>
  );
};
