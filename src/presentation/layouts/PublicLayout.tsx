import { Link, Outlet } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar maxWidth="xl" className="border-b">
        <NavbarBrand>
          <Link to="/" className="font-semibold text-slate-900">
            Corly
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link to="/pricing" className="text-sm text-slate-600">
              Planos
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/login" className="text-sm text-slate-600">
              Entrar
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/signup" color="primary" size="sm">
              Começar trial
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
      <footer className="border-t bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-slate-500">
          Corly © 2024 - Orquestração documental para operações imobiliárias.
        </div>
      </footer>
    </div>
  );
};
