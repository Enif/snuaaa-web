import * as types from '../actions/ActionTypes';
//import update from 'react-addons-update';
//import LoginStatusEnum from '../common/LoginStatusEnum';

const initialState = {
    isLoggedIn: false,
    currentUser: '',
};

function authentication(state = initialState, action) {
    
    switch (action.type) {
        case types.AUTH_LOGIN:
            return {
                ...state,
                isLoggedIn: true
            };
        case types.AUTH_LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                isLoggedIn: false
            }
        case types.AUTH_GET_STATUS:
            return {
                ...state,
                isLoggedIn: true
            };
            
        // case types.AUTH_LOGIN_SUCCESS:
        // return {
        //     ...state,
        //     isLoggedIn: true
        // };
        default:
            return state;
    }
};

export default authentication;