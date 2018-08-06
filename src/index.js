import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux'

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
