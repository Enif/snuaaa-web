import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
// import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers);

ReactDOM.render(
    // <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    // </CookiesProvider>
    , 
    document.getElementById('root'));
registerServiceWorker();
