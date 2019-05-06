import * as types from './ActionTypes';

export const authLogin = (user_id, nickname, level, profile_path) => ({
    type: types.AUTH_LOGIN,
    user_id: user_id,
    nickname: nickname,
    level: level,
    profile_path: profile_path
});

export const authLogout = () => ({
    type: types.AUTH_LOGOUT
});

export const loginCheck = () => ({
    type: types.AUTH_GET_STATUS
});