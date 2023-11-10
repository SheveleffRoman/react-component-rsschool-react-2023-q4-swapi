import { expect, test, vi } from 'vitest';
import { useAppContext } from '../src/context/appContext.ts';
import React from 'react';

test('throws error if context undefined', () => {
  vi.spyOn(React, 'useContext').mockReturnValue(undefined);

  expect(() => useAppContext()).toThrowError();
});
