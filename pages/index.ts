import Main from '../src/Components/Main/Main';
import { planetAPI } from '../src/services/PlanetService';
import { wrapper } from '../src/store/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchValue = context.query.search || '';
    const page = context.query.page || '1';

    store.dispatch(
      planetAPI.endpoints.fetchAllPlanets.initiate({
        searchValue,
        page,
      })
    );

    await Promise.all(store.dispatch(planetAPI.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default Main;
