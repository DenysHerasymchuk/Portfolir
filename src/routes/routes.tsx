import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

// Links only support `viewTransition` with a data router (createBrowserRouter).
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // Catch-all for pages that don't exist yet
      { path: '*', element: <NotFound /> },
    ],
  },
]);
