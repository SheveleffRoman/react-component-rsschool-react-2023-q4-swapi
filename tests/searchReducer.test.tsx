import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import searchReducer, { searchSlice } from '../src/store/reducers/SearchSlice';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer({ searchValue: 'test' }, { type: undefined })).toEqual(
      {
        searchValue: 'test',
      }
    );
  });

  it('should handle a new value being added to store', () => {
    expect(
      searchReducer(
        { searchValue: 'test' },
        searchSlice.actions.changeValue('Run the tests')
      )
    ).toEqual({ searchValue: 'Run the tests' });
  });
});
