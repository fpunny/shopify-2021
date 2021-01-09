import { lazy } from 'react';

const routes = [
  {
    component: lazy(() => import('./pages/Home')),
    exact: true,
    path: `/`,
  },
];

export default routes;