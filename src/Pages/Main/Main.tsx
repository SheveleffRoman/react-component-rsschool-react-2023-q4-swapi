import { useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext.ts';
import { useAppDispatch, useAppSelector } from '../../Components/hooks/redux';
import { IParams, planetAPI } from '../../services/PlanetService';
import { resultsSlice } from '../../store/reducers/ResultsSlice';

const Main = () => {
  const [nextPage, setNextPage] = useState<string>('');
  const [prevPage, setPrevPage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<string | null>('1');
  const [totalPages, setTotalPages] = useState<number>(0);
  const { openDetails, closeDetails } = useAppContext();

  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const { addResults, saveItemsPerPage } = resultsSlice.actions;
  const dispatch = useAppDispatch();

  const params: IParams = {
    searchValue,
    page: currentPage,
  };

  const { data, error, isLoading, isFetching } =
    planetAPI.useFetchAllPlanetsQuery(params);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/?search=${searchValue}&page=${currentPage}`);
    if (data) {
      dispatch(addResults(data.results));
      dispatch(saveItemsPerPage(data.results.length));
      setTotalPages(Math.ceil(data.count / data.results.length));
      setNextPage(data.next!);
      setPrevPage(data.previous!);
    }
  }, [data, searchValue]);

  const handleNextPage = (): void => {
    if (data?.next) {
      setCurrentPage(data.next.slice(-1));
    }
  };

  const handlePrevPage = (): void => {
    if (data?.previous) {
      setCurrentPage(data.previous.slice(-1));
    }
  };

  if (isLoading || isFetching) {
    return (
      <>
        <SearchBar />
        <Loader />
      </>
    );
  }

  if (data?.count == 0) {
    return (
      <>
        <SearchBar />
        <h1>Not found!</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SearchBar />
        <h1>Loading data error</h1>
      </>
    );
  }

  return (
    <>
      <SearchBar />
      <div className="results-container">
        <div className="search-results" onClick={closeDetails}>
          {data?.results &&
            data.results.map((planet) => (
              <Card onClick={openDetails} key={planet.name} data={planet} />
            ))}
        </div>
        <Outlet context={{ closeDetails }} />
      </div>
      <div className="pagination">
        <button
          type="button"
          onClick={() => handlePrevPage()}
          disabled={prevPage === null}
        >
          Prev
        </button>
        <button disabled>
          {currentPage}/{totalPages}
        </button>
        <button
          type="button"
          onClick={() => handleNextPage()}
          disabled={nextPage === null}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Main;
