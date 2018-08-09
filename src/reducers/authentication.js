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
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            }
        default:
            return state;
    }
};

export default authentication;

    // switch(action.type) {
    //     /* LOGIN */
    //     case types.AUTH_LOGIN:
    //         return update(state, {
    //             login: {
    //                 status: { $set: 'WAITING' }
    //             }
    //         });
    //     case types.AUTH_LOGIN_SUCCESS:
    //         return update(state, {
    //             login: {
    //                 status: { $set: 'SUCCESS' }
    //             },
    //             status: {
    //                 isLoggedIn: { $set: true },
    //                 currentUser: { $set: action.username }
    //             }
    //         });
    //     case types.AUTH_LOGIN_FAILURE:
    //         return update(state, {
    //             login: {
    //                 status: { $set: 'FAILURE' }
    //             }
    //         });
    //     default:
    //         return state;
    // }