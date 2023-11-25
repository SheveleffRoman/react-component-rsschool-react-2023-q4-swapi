import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';
import { useDetails } from '../hooks/details';
import { planetAPI } from '../../services/PlanetService';

const Details = () => {
  const router = useRouter();
  const id = router.query.id;

  const {
    data: planetData,
    isLoading: planetIsLoading,
    isFetching: planetIsFetching,
    error,
  } = planetAPI.useFetchPlanetInfoQuery(
    typeof id === 'string' ? id : skipToken,
    {
      skip: router.isFallback,
    }
  );

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
