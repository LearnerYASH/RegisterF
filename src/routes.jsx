import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import RequireAuth from './components/RequireAuth';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  
  
  {
    path: '*',
    layout: AdminLayout,
    guard: RequireAuth,
    routes: [
     
      {
        exact: 'true',
        path: '/CustomerEnquiry',
        element: lazy(() => import('./views/CustomerEnquiry'))
      },
      
      {
        exact: 'true',
        path: '/Logout',
        element: lazy(() => import('./views/Logout'))
      },
      {
        exact: 'true',
        path: '/newcustomer',
        element: lazy(() => import('./views/NewCustomer'))
      },
      {
        exact: 'true',
        path: '/overview',
        element: lazy(() => import('./views/Overview'))
      },
      {
        exact: 'true',
        path: '/users',
        element: lazy(() => import('./views/UserMangment'))
      },
      {
        exact: 'true',
        path: '/newuser',
        element: lazy(() => import('./views/AddUser'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
