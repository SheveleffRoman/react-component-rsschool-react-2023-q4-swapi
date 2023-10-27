import { Component } from 'react';
import Card from '../Card/Card';
import ErrorButton from '../Error/ErrorButton';
import Loader from '../Loader/Loader';

export default class Search extends Component {
  state = {
    storedSearch: '',
    searchResults: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    const storedValue = this.getStoredSearchTerm();
    this.setState({ storedSearch: storedValue });
    this.handleSearch(storedValue!);
  }

  getStoredSearchTerm = () => localStorage.getItem('searchTerm');

  handleSearch = (searchTerm = '') => {
    this.setState({ isLoading: true });
    const apiUrl = searchTerm
      ? `https://swapi.dev/api/planets/?search=${searchTerm}`
      : 'https://swapi.dev/api/planets/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ searchResults: data.results, error: null });
      })
      .catch((error) => {
        this.setState({ searchResults: [], error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ storedSearch: event.target.value });
  };

  search = () => {
    localStorage.setItem('searchTerm', this.state.storedSearch.trim());
    this.handleSearch(this.state.storedSearch.trim());
  };

  render() {
    const { searchResults, isLoading, error } = this.state;

    if (error) {
      throw new Error('API ERROR', error);
    }

    const cardComponents = searchResults.map((item, index) => (
      <Card key={index} data={item} />
    ));

    return (
      <div className="content">
        <div className="search-panel">
          <input
            value={this.state.storedSearch}
            onChange={this.handleSearchChange}
          />
          <button onClick={this.search}>Search planets</button>
          <ErrorButton />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="search-results">{cardComponents}</div>
        )}
      </div>
    );
  }
}
