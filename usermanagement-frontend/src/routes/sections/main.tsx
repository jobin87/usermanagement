import { lazy, Suspense } from "react";

const Page404 = lazy(() => import("src/pages/404"));

export const mainRoutes = [
  {
    path: "/404", // ✅ Must be absolute
    element: (
      <Suspense fallback={null}>
        <Page404 />
      </Suspense>
    ),
  },
];
