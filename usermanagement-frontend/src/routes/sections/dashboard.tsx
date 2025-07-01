import { Navigate, Outlet } from "react-router-dom";
import { GuestGuard } from "src/guard";
import { Suspense, lazy } from "react";
import { LoadingScreen } from "src/components/loading-screen";
import MainLayout from "src/layout/dashboard/layout";

// Lazy loaded components
const FormList = lazy(() => import("src/pages/form-list"));

const layoutContent = (
  <MainLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </MainLayout>
);

const dashboardRoutes = [
  {
    path: "dashboard",
    element: <GuestGuard>{layoutContent}</GuestGuard>,
    children: [
      {
        index: true,
        element: <Navigate to="formlist" replace />, // ✅ This is the key fix
      },
      {
        path: "formlist",
        element: <Outlet />,
        children: [{ index: true, element: <FormList /> }],
      },
    ],
  },
];

export default dashboardRoutes;
