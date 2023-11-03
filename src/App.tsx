import { Outlet } from 'react-router-dom';
import ErrorBoundary from './Components/Error/ErrorBoundary';

export type SearchProps = {
  onSearch: (searchTerm: string) => void;
};

export interface Planet {
  name: string;
  climate: string;
  diameter: string;
  rotation_period: string;
  population: string;
  terrain: string;
  surface_water: string;
}

export type SearchResultsProps = {
  searchResults: Planet[];
  isLoading: boolean;
  error: Error | null;
};

const App = () => {
  return (
    <ErrorBoundary>
      <div className="wrapper_content">
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export default App;
