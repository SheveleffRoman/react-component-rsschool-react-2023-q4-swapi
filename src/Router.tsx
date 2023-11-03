import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './Pages/Main/Main';
import Details from './Components/Details/Details';

export const Router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [
          {
            path: 'details/:id',
            element: <Details />,
          },
        ],
      },
    ],
  },
]);
