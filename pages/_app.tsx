import { wrapper } from '../src/store/store';
import { AppProps } from 'next/app';
import '../src/index.css';
import { Provider } from 'react-redux';
import { FC } from 'react';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

export default MyApp;
