import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import history from './history'
import { BrowserRouter , Router } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './redux/store'
import ErrorBoundary from './ErrorBoundary'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <Router history={history}>
          <App/>
        </Router>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
