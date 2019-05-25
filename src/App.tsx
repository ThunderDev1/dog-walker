import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {FunctionComponent, ReactElement} from 'react';
import Routes from './Routes';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {ConnectedRouter} from 'connected-react-router';
import {history} from './configureStore';

import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.min.css';
import './style/main.scss';

const store = configureStore();

const App: FunctionComponent<{}> = (): ReactElement => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default hot(App);
