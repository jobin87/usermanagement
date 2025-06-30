import { Navigate, Outlet } from 'react-router-dom';
import { GuestGuard } from 'src/guard';
import { Suspense, lazy } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import AuthLayout from 'src/layout/authLayout';

// Lazy loaded components
const FormPage = lazy(() => import('src/pages/form'));
const FormList = lazy(() => import('src/pages/form-list'));



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
        element: <Navigate to="form" replace />, // ✅ This is the key fix
      },
      {
        path: 'form',
        element: <Outlet />,
        children: [
          { index: true, element: <FormPage /> },

        ],
      },
    ],
  },
];

export default authRoutes;
