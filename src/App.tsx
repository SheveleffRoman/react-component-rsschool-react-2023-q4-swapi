import ErrorBoundary from './Components/Error/ErrorBoundary';
import Main from './Pages/Main/MainPage';

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
        <Main />
      </div>
    </ErrorBoundary>
  );
};

export default App;
