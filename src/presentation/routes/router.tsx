import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/presentation/layouts/PublicLayout';
import { AppLayout } from '@/presentation/layouts/AppLayout';
import { LandingPage } from '@/presentation/pages/LandingPage';
import { PricingPage } from '@/presentation/pages/PricingPage';
import { SignupPage } from '@/presentation/pages/SignupPage';
import { LoginPage } from '@/presentation/pages/LoginPage';
import { DashboardPage } from '@/presentation/pages/DashboardPage';
import { CasesListPage } from '@/presentation/pages/CasesListPage';
import { CaseDetailPage } from '@/presentation/pages/CaseDetailPage';
import { AlertsPage } from '@/presentation/pages/AlertsPage';
import { OnboardingPage } from '@/presentation/pages/OnboardingPage';
import { AdminDocumentTypesPage } from '@/presentation/pages/AdminDocumentTypesPage';
import { AdminUsersPage } from '@/presentation/pages/AdminUsersPage';
import { NotFoundPage } from '@/presentation/pages/NotFoundPage';
import { ForbiddenPage } from '@/presentation/pages/ForbiddenPage';
import { ProtectedRoute, AdminRoute } from '@/presentation/routes/guards';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/pricing', element: <PricingPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/login', element: <LoginPage /> }
    ]
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/app/onboarding', element: <OnboardingPage /> },
      { path: '/app/dashboard', element: <DashboardPage /> },
      { path: '/app/cases', element: <CasesListPage /> },
      { path: '/app/cases/:id', element: <CaseDetailPage /> },
      { path: '/app/alerts', element: <AlertsPage /> },
      {
        path: '/app/admin/document-types',
        element: (
          <AdminRoute>
            <AdminDocumentTypesPage />
          </AdminRoute>
        )
      },
      {
        path: '/app/admin/users',
        element: (
          <AdminRoute>
            <AdminUsersPage />
          </AdminRoute>
        )
      },
      { path: '/app/forbidden', element: <ForbiddenPage /> }
    ]
  },
  { path: '*', element: <NotFoundPage /> }
]);
