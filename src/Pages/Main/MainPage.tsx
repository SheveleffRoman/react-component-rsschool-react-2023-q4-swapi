import { useEffect, useState } from 'react';
import DataService from '../../API/DataService';
import { Planet } from '../../App';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';

const Main = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedValue = getStoredSearchTerm();

    if (storedValue || storedValue == '') {
      handleSearch(storedValue);
    }
  }, []);

  const getStoredSearchTerm = (): string | null =>
    localStorage.getItem('searchTerm');

  const handleSearch = (searchTerm: string = '') => {
    setIsLoading(true);

    DataService.getAll(searchTerm)
      .then((response) => {
        const data = response.data;
        setSearchResults(data.results);
      })
      .catch((error) => {
        setSearchResults([]);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (error) {
    throw new Error('API ERROR', error);
  }

  const cardComponents = searchResults.map((item: Planet) => (
    <Card key={item.name} data={item} />
  ));
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search-results">{cardComponents}</div>
      )}
    </>
  );
};

export default Main;
