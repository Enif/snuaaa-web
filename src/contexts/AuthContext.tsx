import React from 'react';

const initialAuth = {
    isLoggedIn: false,
    user_id: 0,
    nickname: '',
    level: 0,
    profile_path: '',
};

const AuthContext = React.createContext(initialAuth);

export default AuthContext;
