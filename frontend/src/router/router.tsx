import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '../layouts/RootLayout';
// import HomePage from '../pages/HomePage/HomePage';
// import { TrashList } from '../components/TrashList/TrashList';
// import AboutPage from '../pages/AboutPage';
// import NotFoundPage from '../pages/NotFoundPage';
// import { AppLayout } from '../layouts/AppLayout';
// import { LoginPage } from '../pages/Auth/LoginPage';
// import { RegisterPage } from '../pages/Auth/RegisterPage';
import { PublicOnlyRoute } from '../auth/PublicOnlyRoute';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
// import { ProtectedRoute } from '../routes/ProtectedRoute/ProtectedRoute';

const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const TrashList = lazy(() => import('../components/TrashList/TrashList'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
        ],
      },
      {
        // path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: '/trash',
            element: <TrashList />,
          },
        ],
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
