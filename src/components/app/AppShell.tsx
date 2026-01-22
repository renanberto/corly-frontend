import { ReactNode, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button, Input } from '@heroui/react';
import { uiStore } from '@/lib/uiStore';

interface NavItem {
  to: string;
  label: string;
  icon?: string;
}

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface AppShellProps {
  brand?: string;
  navItems: NavItem[];
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
  primaryAction?: ReactNode;
}

export const AppShell = ({
  brand = 'Corly',
  navItems,
  breadcrumbs,
  children,
  primaryAction
}: AppShellProps) => {
  const { sidebarCollapsed, toggleSidebar } = uiStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const breadcrumbTrail = useMemo(() => {
    return breadcrumbs?.length ? breadcrumbs : null;
  }, [breadcrumbs]);

  const handleNavigate = () => {
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform motion-safe:duration-200 lg:static lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
            <Link to="/app/dashboard" className="text-lg font-semibold tracking-tight">
              {brand}
            </Link>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              aria-label={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
              onPress={toggleSidebar}
              className="hidden lg:inline-flex"
            >
              {sidebarCollapsed ? '»' : '«'}
            </Button>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-600">
                  {item.icon ?? item.label.charAt(0)}
                </span>
                <span className={`${sidebarCollapsed ? 'lg:hidden' : 'lg:block'}`}>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {mobileOpen && (
          <button
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
          />
        )}

        <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
              <Button
                isIconOnly
                variant="light"
                aria-label="Abrir menu"
                className="lg:hidden"
                onPress={() => setMobileOpen(true)}
              >
                ☰
              </Button>
              <div className="flex-1">
                {breadcrumbTrail ? (
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    {breadcrumbTrail.map((crumb, index) => (
                      <span key={crumb.label} className="flex items-center gap-2">
                        {crumb.to ? (
                          <Link to={crumb.to} className="hover:text-slate-700">
                            {crumb.label}
                          </Link>
                        ) : (
                          <span className="text-slate-600">{crumb.label}</span>
                        )}
                        {index < breadcrumbTrail.length - 1 && <span>/</span>}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">Você está em {location.pathname}</div>
                )}
                <div className="mt-1 flex items-center gap-3">
                  <Input
                    aria-label="Buscar"
                    placeholder="Buscar casos, alertas, documentos"
                    size="sm"
                    className="max-w-md"
                  />
                  <div className="hidden items-center gap-2 md:flex">
                    <Button size="sm" variant="flat">
                      Atalhos
                    </Button>
                    {primaryAction ?? (
                      <Button size="sm" color="primary">
                        Nova ação
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600"
                  aria-label="Perfil do usuário"
                >
                  CF
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
};
