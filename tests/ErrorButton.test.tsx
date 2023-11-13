import { fireEvent, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import ErrorButton from '../src/Components/Error/ErrorButton';

describe('ErrorButton', () => {
  it('render error button', () => {
    const { getByText } = render(<ErrorButton />);

    const button = getByText('Fake error');

    expect(button).toBeInTheDocument;
  });

  it('logs error to console when clicked', () => {
    const { getByRole } = render(<ErrorButton />);

    const button = getByRole('fake-error');

    try {
      fireEvent.click(button);
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Fake error');
      }
    }
  });
});
