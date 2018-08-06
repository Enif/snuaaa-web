import authentication from './authentication'

import { combineReducers } from 'redux'

const reducers = combineReducers({
    authentication: authentication
});

export default reducers;