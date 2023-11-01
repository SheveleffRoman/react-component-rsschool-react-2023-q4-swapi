import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import ErrorButton from '../Error/ErrorButton';
import Loader from '../Loader/Loader';
import { Planet } from '../../App';

const Search = () => {
  const [storedSearch, setStoredSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedValue = getStoredSearchTerm();
    if (storedValue == '' || storedValue) {
      setStoredSearch(storedValue);
      handleSearch(storedValue);
    }
  }, []);

  const getStoredSearchTerm = (): string | null =>
    localStorage.getItem('searchTerm');

  const handleSearch = (searchTerm: string = '') => {
    setIsLoading(true);
    const apiUrl = searchTerm
      ? `https://swapi.dev/api/planets/?search=${searchTerm}`
      : 'https://swapi.dev/api/planets/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        setError(null);
      })
      .catch((error) => {
        setSearchResults([]);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoredSearch(event.target.value);
  };

  const searchClick = () => {
    localStorage.setItem('searchTerm', storedSearch.trim());
    handleSearch(storedSearch.trim());
  };

  if (error) {
    throw new Error('API ERROR', error);
  }

  const cardComponents = searchResults.map((item: Planet) => (
    <Card key={item.name} data={item} />
  ));

  return (
    <div className="content">
      <div className="search-panel">
        <input value={storedSearch} onChange={handleSearchChange} />
        <button onClick={searchClick}>Search planets</button>
        <ErrorButton />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search-results">{cardComponents}</div>
      )}
    </div>
  );
};

export default Search;
