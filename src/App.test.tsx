import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders header and hero', () => {
  render(<App />);
  expect(within(screen.getByRole('banner')).getByRole('link', { name: /^home$/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
