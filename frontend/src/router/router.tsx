import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import { TrashList } from '../components/TrashList/TrashList';
// import { AppLayout } from '../layouts/AppLayout';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { LoginPage } from '../pages/Auth/LoginPage';
import { RegisterPage } from '../pages/Auth/RegisterPage';
import { PublicOnlyRoute } from '../auth/PublicOnlyRoute';
// import { ProtectedRoute } from '../routes/ProtectedRoute/ProtectedRoute';

export const router = createBrowserRouter([
  {
    // path: '/',
    element: <RootLayout />,
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
]);
