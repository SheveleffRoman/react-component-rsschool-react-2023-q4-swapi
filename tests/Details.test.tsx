import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Details from '../src/Components/Details/Details';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object;
  return {
    ...actual,
    useOutletContext: vi.fn(() => closeDetails),
  };
});

describe('Details', () => {
  it('Check that a loading indicator is displayed while fetching data', () => {
    render(<Details />);

    const heading = screen.getByRole('heading', { name: /loading/i });
    expect(heading).toBeInTheDocument();
  });
});

function closeDetails() {
  throw new Error('Function not implemented.');
}

// vi.mock('../src/context/appContext.ts', async () => {
//   const actual = (await vi.importActual(
//     '../src/context/appContext.ts'
//   )) as object;
//   return {
//     ...actual,
//     useState: vi.fn(() => ({
//       planet: {
//         name: 'tatooine',
//         residents: [],
//       },
//       residentsData: {
//         name: 'name',
//       },
//     })),
//   };
// });

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(() => closeDetails),
  useParams: vi.fn(() => ({
    id: '1',
  })),
}));

it('Details component renders and fetches data', async () => {
  const { queryByText } = render(<Details />);

  // expect(getByRole('details-card')).toBeInTheDocument();
  expect(queryByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    // expect(getByRole('details-card')).toBeInTheDocument();
    // expect(queryByText('Popular citizens of tatooine')).toBeInTheDocument();
    // expect(queryByText('Resident Name')).toBeInTheDocument();
  });
});
