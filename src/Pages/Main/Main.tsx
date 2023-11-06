import { useEffect } from 'react';
import DataService from '../../API/DataService';
import { Planet } from '../../App';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext.ts';

const Main = () => {
  const {
    searchResults,
    setSearchResults,
    error,
    setError,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
    prevPage,
    setPrevPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    openDetails,
    closeDetails,
    searchTerm,
  } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
    if (searchTerm || searchTerm === '') {
      handleSearch(searchTerm);
    }
  }, []);

  const handleSearch = (searchTerm: string = '') => {
    setIsLoading(true);
    closeDetails;

    if (searchTerm == '') {
      navigate(``);
    } else {
      navigate(`/?search=${searchTerm}`);
    }

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
    closeDetails;
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
            <Outlet context={{ closeDetails }} />
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
