import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import ErrorPage from '../src/Components/Error/NotFound';

describe('404 Page Component', () => {
  it('renders 404 page for invalid route', () => {
    // Render the NotFoundPage component
    render(<ErrorPage />);

    // screen.debug();
    const notFoundText = screen.getByText(
      'Sorry, an unexpected error has occurred'
    );
    expect(notFoundText).toBeInTheDocument();
  });
});
