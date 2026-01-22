import { Link, Outlet } from 'react-router-dom';
import { sessionStore } from '@/presentation/viewmodels/useSessionStore';
import { TrialBanner } from '@/presentation/components/TrialBanner';
import { useMeVM } from '@/presentation/viewmodels/useAuthVM';
import { AppShell } from '@/components/app/AppShell';

const navLinks = [
  { to: '/app/dashboard', label: 'Dashboard', icon: 'D' },
  { to: '/app/cases', label: 'Casos', icon: 'C' },
  { to: '/app/alerts', label: 'Alertas', icon: 'A' }
];

export const AppLayout = () => {
  const trial = sessionStore((state) => state.trial);
  const permissions = sessionStore((state) => state.permissions);
  useMeVM();

  const fullNav = permissions.includes('admin:read')
    ? [...navLinks, { to: '/app/admin/document-types', label: 'Admin', icon: '⚙️' }]
    : navLinks;

  return (
    <AppShell
      navItems={fullNav}
      primaryAction={
        <Link
          to="/app/onboarding"
          className="inline-flex items-center rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white"
        >
          Novo fluxo
        </Link>
      }
    >
      <div className="space-y-6">
        {trial && <TrialBanner trial={trial} />}
        <Outlet />
      </div>
    </AppShell>
  );
};
