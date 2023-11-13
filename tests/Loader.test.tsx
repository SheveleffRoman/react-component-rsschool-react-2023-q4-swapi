import { render } from '@testing-library/react';
import Loader from '../src/Components/Loader/Loader';
import { describe, it, expect } from 'vitest';

describe('Loader', () => {
  it('renders loader div', () => {
    const { getByRole } = render(<Loader />);
    const loaderEl = getByRole('loader');

    expect(loaderEl).toBeInTheDocument();
    expect(loaderEl).toHaveClass('loading');
  });
});
