import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Project from '../pages/Project';
import Stack from '../pages/Stack';
import Work from '../pages/Work';

// Links only support `viewTransition` with a data router (createBrowserRouter).
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'work', element: <Work /> },
      { path: 'work/:slug', element: <Project /> },
      { path: 'about', element: <About /> },
      { path: 'stack', element: <Stack /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
