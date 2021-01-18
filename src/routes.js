import { lazy } from 'react';

const routes = [
  {
    component: lazy(() => import('./pages/Home')),
    exact: true,
    path: `/`,
  },
  {
    component: lazy(() => import('./pages/Share')),
    exact: true,
    path: `/share/:payload`,
  },
];

export default routes;
