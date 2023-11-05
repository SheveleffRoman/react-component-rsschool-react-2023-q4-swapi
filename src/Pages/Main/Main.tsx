import { useEffect, useState } from 'react';
import DataService from '../../API/DataService';
import { Planet } from '../../App';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import { Outlet, useNavigate } from 'react-router-dom';

const Main = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [currentPage, setCurrentPage] = useState('1');
  const [totalPages, setTotalPages] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const navigate = useNavigate();

  const openDetails = () => {
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    if (isDetailsOpen) {
      navigate('/');
      setIsDetailsOpen(false);
    }
  };

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
    setIsDetailsOpen(false);

    DataService.getAll(searchTerm)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setSearchResults(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setTotalPages(Math.ceil(data.count / data.results.length));
      })
      .catch((error) => {
        setSearchResults([]);
        setNextPage('');
        setPrevPage('');
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePage = (url: string) => {
    setIsLoading(true);
    setIsDetailsOpen(false);
    setSearchResults([]);
    navigate(`/?search=&page=${url.slice(-1)}`);
    DataService.getByPage(url)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setSearchResults(data.results);
        setCurrentPage(url.slice(-1));
      })
      .catch((error) => {
        setSearchResults([]);
        setNextPage('');
        setPrevPage('');
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
    <Card onClick={openDetails} key={item.name} data={item} />
  ));

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="results-container">
            <div className="search-results" onClick={closeDetails}>
              {cardComponents}
            </div>
            <Outlet />
          </div>
          <div className="pagination">
            <button
              type="button"
              onClick={() => handlePage(prevPage)}
              disabled={prevPage === null}
            >
              Prev
            </button>
            <button disabled>
              {currentPage}/{totalPages}
            </button>
            <button
              type="button"
              onClick={() => handlePage(nextPage)}
              disabled={nextPage === null}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Main;
