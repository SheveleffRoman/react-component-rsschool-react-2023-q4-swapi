import { Outlet } from 'react-router-dom';
import ErrorBoundary from './Components/Error/ErrorBoundary';
import { AppProvider } from './context/AppProvider';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

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
  url: string;
}

export type SearchResultsProps = {
  searchResults: Planet[];
  isLoading: boolean;
  error: Error | null;
};

const store = setupStore();

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="wrapper_content">
          <AppProvider>
            <Outlet />
          </AppProvider>
        </div>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
