import { Component } from 'react';
import Search from './Components/Search/Search';

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

class App extends Component {
  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

export default App;
