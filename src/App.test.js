import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Shahmeer Ali heading', () => {
  render(<App />);
  const headingElements = screen.getAllByText(/Shahmeer Ali/i);
  expect(headingElements.length).toBeGreaterThan(0);
});
