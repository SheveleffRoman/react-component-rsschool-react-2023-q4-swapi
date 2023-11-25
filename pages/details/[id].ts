import Details from '../../src/Components/Details/Details';
import { planetAPI } from '../../src/services/PlanetService';
import { wrapper } from '../../src/store/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(planetAPI.endpoints.fetchPlanetInfo.initiate(id));
    }

    await Promise.all(store.dispatch(planetAPI.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default Details;
