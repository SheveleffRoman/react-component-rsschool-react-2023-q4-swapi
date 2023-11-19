import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { planetAPI } from '../../services/PlanetService';
import { useDetails } from '../hooks/details';

const Details = () => {
  const { id } = useParams();

  const {
    data: planetData,
    isLoading: planetIsLoading,
    isFetching: planetIsFetching,
    error,
  } = planetAPI.useFetchPlanetInfoQuery(id);

  const { close } = useDetails();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (planetIsLoading || planetIsFetching) {
    return (
      <>
        <h1>Loading data...</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1 role="error-data">Loading data error</h1>
      </>
    );
  }

  return (
    <div className="details" role="details-card">
      <h1>Stat facts about planet {planetData?.name}</h1>
      {planetData && (
        <h2>
          Number of famous movie characters from this planet:{' '}
          {planetData.residents.length}
        </h2>
      )}
      {planetData && (
        <h2>
          The planet appeared in {planetData.films.length}{' '}
          {planetData.films.length == 1 ? 'film' : 'films'}
        </h2>
      )}
      <button type="button" onClick={close}>
        back
      </button>
    </div>
  );
};

export default Details;
