import { useEffect } from 'react';
import { IParams, planetAPI } from '../../services/PlanetService';
import { resultsSlice } from '../../store/reducers/ResultsSlice';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import { useDetails } from '../hooks/details';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import SearchBar from '../SearchBar/SearchBar';

const Main = () => {
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.resultsSlice
  );
  const { addResults, saveItemsPerPage, changePage, setTotalPages } =
    resultsSlice.actions;

  const dispatch = useAppDispatch();

  const params: IParams = {
    searchValue,
    page: currentPage.toString(),
  };

  const { data, error, isLoading, isFetching } =
    planetAPI.useFetchAllPlanetsQuery(params);

  useEffect(() => {
    if (data) {
      dispatch(addResults(data.results));
      dispatch(saveItemsPerPage(data.results.length));
      dispatch(setTotalPages(Math.ceil(data.count / data.results.length)));
    }
  }, [data]);

  const handleNextPage = (): void => {
    if (data?.next) {
      dispatch(changePage(currentPage + 1));
    }
  };

  const handlePrevPage = (): void => {
    if (data?.previous) {
      dispatch(changePage(currentPage - 1));
    }
  };

  const { close } = useDetails();

  if (isLoading || isFetching) {
    return <Loader />;
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
      <div className="wrapper_content">
        <div className="results-container">
          <div className="search-results" onClick={close}>
            {data?.results &&
              data.results.map((planet) => (
                <Card key={planet.name} data={planet} />
              ))}
          </div>
        </div>
        <div className="pagination">
          <button
            type="button"
            onClick={() => handlePrevPage()}
            disabled={data?.previous === null}
          >
            Prev
          </button>
          <button role="pages" disabled>
            {currentPage}/{totalPages}
          </button>
          <button
            type="button"
            onClick={() => handleNextPage()}
            disabled={data?.next === null}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
