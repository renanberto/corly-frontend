import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/presentation/routes/guards';
import { sessionStore } from '@/presentation/viewmodels/useSessionStore';

const ProtectedContent = () => <div>Conteudo protegido</div>;

describe('ProtectedRoute', () => {
  it('redireciona para login quando não autenticado', () => {
    sessionStore.setState({ accessToken: null });

    render(
      <MemoryRouter initialEntries={['/app']}> 
        <Routes>
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <ProtectedContent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renderiza conteúdo quando autenticado', () => {
    sessionStore.setState({ accessToken: 'token' });

    render(
      <MemoryRouter initialEntries={['/app']}> 
        <Routes>
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <ProtectedContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Conteudo protegido')).toBeInTheDocument();
  });
});
