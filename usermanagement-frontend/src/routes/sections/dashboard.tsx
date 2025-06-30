import { Navigate, Outlet } from 'react-router-dom';
import { GuestGuard } from 'src/guard';
import { Suspense, lazy } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import AuthLayout from 'src/layout/authLayout';

// Lazy loaded components
const FormList = lazy(() => import('src/pages/form-list'));



// Layout + fallback
const layoutContent = (
  <AuthLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </AuthLayout>
);

const dashboardRoutes = [
  {
    path: 'dashboard',
    element: <GuestGuard>{layoutContent}</GuestGuard>,
    children: [
      {
        index: true,
        element: <Navigate to="formlist" replace />, // ✅ This is the key fix
      },
      {
        path: 'formlist',
        element: <Outlet />,
        children: [
          { index: true, element: <FormList />},

        ],
      },
    ],
  },
];

export default dashboardRoutes;
