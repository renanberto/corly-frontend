import { Link, NavLink, Outlet } from 'react-router-dom';
import { Button, Card, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { sessionStore } from '@/presentation/viewmodels/useSessionStore';
import { TrialBanner } from '@/presentation/components/TrialBanner';
import { useMeVM } from '@/presentation/viewmodels/useAuthVM';

const navLinks = [
  { to: '/app/dashboard', label: 'Dashboard' },
  { to: '/app/cases', label: 'Casos' },
  { to: '/app/alerts', label: 'Alertas' }
];

export const AppLayout = () => {
  const trial = sessionStore((state) => state.trial);
  const permissions = sessionStore((state) => state.permissions);
  useMeVM();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar maxWidth="xl" className="border-b bg-white">
        <NavbarBrand>
          <Link to="/app/dashboard" className="font-semibold text-slate-900">
            Corly
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} to="/app/onboarding" size="sm" variant="flat">
              Novo fluxo
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <aside className="space-y-4">
          <Card className="p-4 space-y-2">
            <div className="text-xs text-slate-500">Navegação</div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {permissions.includes('admin:read') && (
                <NavLink
                  to="/app/admin/document-types"
                  className={({ isActive }) =>
                    `text-sm ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600'}`
                  }
                >
                  Admin
                </NavLink>
              )}
            </nav>
          </Card>
          {trial && <TrialBanner trial={trial} />}
        </aside>
        <main className="space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
