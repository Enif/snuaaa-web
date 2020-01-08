import React from 'react';
import UserType from '../types/UserType';

const initialAuth = {
    authInfo: {
        isLoggedIn: false,
        user: {
            user_id: 0,
            nickname: '',
            level: 0,
            profile_path: '',
        }
    },
    authLogin: (token: string, autoLogin: boolean, userInfo: UserType) => {
        console.log(token)
    },
    authLogout: () => {}
};

const AuthContext = React.createContext(initialAuth);

export default AuthContext;
