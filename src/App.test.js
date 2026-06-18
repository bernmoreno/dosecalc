import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dosecalc header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /^dosecalc$/i });
  expect(headerElement).toBeInTheDocument();
});
