import * as types from './ActionTypes';

export const authLogin = () => ({
    type: types.AUTH_LOGIN
});

export const authLogout = () => ({
    type: types.AUTH_LOGOUT
});

export const loginCheck = () => ({
    type: types.AUTH_GET_STATUS
});