import * as types from '../actions/ActionTypes';
//import update from 'react-addons-update';
//import LoginStatusEnum from '../common/LoginStatusEnum';

const initialState = {
    isLoggedIn: false,
    nickname: '',
    level: '',
    profile_path: '',
};

function authentication(state = initialState, action) {
    
    switch (action.type) {
        case types.AUTH_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                nickname: action.nickname,
                level: action.level,
                profile_path: action.profile_path
            };
        case types.AUTH_LOGOUT:
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            return {
                ...state,
                isLoggedIn: false,
                nickname: '',
                level: 0,
                profile_path: ''
            }
        case types.AUTH_GET_STATUS:
            return {
                ...state,
                isLoggedIn: true
            };
            
        default:
            return state;
    }
};

export default authentication;