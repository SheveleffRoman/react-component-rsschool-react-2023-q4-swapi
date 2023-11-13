import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext.ts';
import DataService from '../../API/DataService.js';

export function usePageHandler() {
  const {
    setSearchResults,
    setError,
    setIsLoading,
    setNextPage,
    setPrevPage,
    setCurrentPage,
    closeDetails,
  } = useAppContext();
  const navigate = useNavigate();

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

  return handlePage;
}
