import { ReactElement } from 'react';
import { IParams, planetAPI } from '../../services/PlanetService';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import { useDetails } from '../hooks/details';
import SearchBar from '../SearchBar/SearchBar';
import { useRouter } from 'next/router';

const Main = ({ children }: { children: ReactElement | undefined }) => {
  const router = useRouter();

  const currentPage = router.query.page || '1';

  const searchValue = router.query.search || '';

  const page = router.query.page || '1';

  const params: IParams = {
    searchValue,
    page,
  };

  const { data, error, isLoading, isFetching } =
    planetAPI.useFetchAllPlanetsQuery(params);

  let totalPages = '0';

  if (data) {
    totalPages = Math.ceil(data!.count / data!.results.length).toString();
  }

  const handleNextPage = (): void => {
    if (data?.next) {
      const nextPage = data.next.slice(-1);
      const query = `/?search=&page=${nextPage}`;
      router.push(query);
    }
  };

  const handlePrevPage = (): void => {
    if (data?.previous) {
      const prevPage = data.previous.slice(-1);
      const query = `/?search=&page=${prevPage}`;
      router.push(query);
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
          {children}
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
