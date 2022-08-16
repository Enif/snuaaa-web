import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import history from 'common/history';
// import '@fortawesome/fontawesome-free/css/all.css';
// import '@fortawesome/free-solid-svg-icons';
// import '@fortawesome/fontawesome-common-types/all.css';
// import '@fortawesome/free-solid-svg-icons'
// import '@fortawesome/free-solid-svg-icons/all.css'
// import { CookiesProvider } from 'react-cookie';

import './index.css';
import 'remixicon/fonts/remixicon.css';
import App from './App';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {
  console.log('production mode');
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line no-inner-declarations
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'UA-154430849-1');
}

const store = createStore(reducers);

ReactDOM.render(
  // <CookiesProvider>
  <Provider store={store}>
    <Router basename="/page" history={history} >
      <App />
    </Router>
  </Provider>
  // </CookiesProvider>
  ,
  document.getElementById('root'));
serviceWorker.unregister();
