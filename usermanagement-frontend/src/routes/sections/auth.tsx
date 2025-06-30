import { Navigate, Outlet } from 'react-router-dom';
import { GuestGuard } from 'src/guard';
import { Suspense, lazy } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import AuthLayout from 'src/layout/authLayout';

// Lazy loaded components
const FormPage = lazy(() => import('src/pages/form'));


// Layout + fallback
const layoutContent = (
  <AuthLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </AuthLayout>
);

const authRoutes = [
  {
    path: 'auth',
    element: <GuestGuard>{layoutContent}</GuestGuard>,
    children: [
      {
        index: true,
        element: <Navigate to="auth" replace />, // ✅ This is the key fix
      },
      {
        path: 'auth',
        element: <Outlet />,
        children: [
          { index: true, element: <FormPage /> },

        ],
      },
    ],
  },
];

export default authRoutes;
