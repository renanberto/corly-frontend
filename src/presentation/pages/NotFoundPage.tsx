import { Card } from '@heroui/react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="p-6 space-y-3">
        <h1 className="text-xl font-semibold">Página não encontrada</h1>
        <p className="text-sm text-slate-500">Verifique o endereço ou volte para o início.</p>
        <Link to="/" className="text-sm text-primary-600">
          Ir para a landing
        </Link>
      </Card>
    </div>
  );
};
