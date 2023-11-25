import Main from '../src/Components/Main/Main';
import { planetAPI } from '../src/services/PlanetService';
import { wrapper } from '../src/store/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { searchReducer, resultsSlice } = store.getState();
    const searchValue = searchReducer.searchValue;
    const page = resultsSlice.currentPage.toString();

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
