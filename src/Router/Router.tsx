import { createBrowserRouter } from 'react-router-dom';
import Main from '../Components/Main/Main';
import RHF from '../Components/ReactHookForm/ReactHookForm';
import Uncontrolled from '../Components/UncontrolledComponents/UnconrolledComponent';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: 'uncontrolled',
    element: <Uncontrolled />,
  },
  {
    path: 'RHF',
    element: <RHF />,
  },
]);
