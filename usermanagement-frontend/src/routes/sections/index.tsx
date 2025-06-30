import { Navigate, useRoutes } from 'react-router-dom';


import { mainRoutes } from './main';
import { CONFIG } from 'src/config-global';
import { paths } from '../paths';
import authRoutes from './auth';
import dashboardRoutes from './dashboard';
// import dashboardRoutes from './dashboard';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={paths.auth.Form} replace />,
    },


    // Dashboard
    ...authRoutes,

    ...dashboardRoutes

    // Main
    // ...mainRoutes,

    // No match
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
