import React from 'react';
import { Button, Card } from '@heroui/react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <Card className="max-w-md w-full p-6 space-y-4">
            <h2 className="text-xl font-semibold">Algo deu errado</h2>
            <p className="text-sm text-slate-600">
              Ocorreu um erro inesperado. Você pode recarregar a aplicação e continuar.
            </p>
            <Button color="primary" onPress={() => window.location.reload()}>
              Recarregar
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
