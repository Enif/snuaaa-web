import React from 'react';

const defaultUser = {
    isLoggedIn: true,
    userLevel: 10,

    // login: (level) => {
    //     this.isLoggedIn = true
    //     this.userLevel = level
    // }
}

const UserContext = React.createContext(defaultUser);

export default UserContext;