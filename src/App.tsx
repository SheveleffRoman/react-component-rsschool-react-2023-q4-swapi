import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router';
import './index.css';

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
