import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/router.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Loader from './components/Loader/Loader.tsx';
// import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
