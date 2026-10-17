import { flushSync } from 'react-dom';
import { RouterProvider } from 'react-router';
import { router } from './routes/routes';

export default function App() {
  // flushSync lets React Router swap the page inside a view transition.
  return <RouterProvider router={router} flushSync={fn => void flushSync(fn)} />;
}
