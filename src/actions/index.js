import * as types from './ActionTypes';

export const authLogin = () => ({
    type: types.AUTH_LOGIN
});

export const authLogout = () => ({
    type: types.AUTH_LOGOUT
});