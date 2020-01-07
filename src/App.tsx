import React, { Component, Props } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';

import './App.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

import Section from './containers/Section';
import Loading from './components/Common/Loading';
import { getToken } from './utils/tokenManager';
import AuthService from './services/AuthService';
import { authLogin, authLogout } from './actions';
import history from './common/history';
import AuthContext from './contexts/AuthContext';
import AuthType from './types/AuthType';
import BoardType from './types/BoardType';
// import UserContext from './UserContext';

const TAG = 'App'

type AppProps = {
    onAuthLogin: (user_id: number, nickname: string, level: number,
        profile_path: string, token: string, autoLogin: boolean) => void;
    onLogout: () => void;
    loginState: boolean;
}

type AppState = {
    isReady: boolean;
    authInfo: AuthType;
    boardInfo: BoardType[];
}

const initialAuth: AuthType = {
    isLoggedIn: false,
    user_id: 0,
    nickname: '',
    level: 0,
    profile_path: '',
};


class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        console.log(`[%s] constructor`, TAG)
        this.state = {
            isReady: false,
            authInfo: initialAuth,
            boardInfo: []
        }
    }

    componentDidMount() {
        this.checkToken();
    }

    // shouldComponentUpdate(nextProps: AppProps, nextState: AppState) {
    //     if (nextState.isReady === false) {
    //         return false;
    //     }
    //     return true;
    // }

    checkToken = async () => {
        const accessToken = getToken();

        if (!accessToken) {
            //토큰이 없으면 logout
            history.replace({
                pathname: '/login',
                state: { accessPath: history.location.pathname }
            })
            this.props.onLogout();
            this.setState({
                isReady: true
            })
        }
        else {
            // 서버에 토큰 확인 , invalid => logout, valid => 로그인 유지(연장)
            await AuthService.checkToken()
                .then((res: any) => {
                    const { token, user_id, nickname, level, profile_path, autoLogin } = res.data;

                    this.props.onAuthLogin(user_id, nickname, level, profile_path, token, autoLogin);
                    this.setState({
                        isReady: true,
                        authInfo: {
                            isLoggedIn: true,
                            user_id: user_id,
                            nickname: nickname,
                            level: level,
                            profile_path: profile_path
                        }
                    })
                })
                .catch((err: Error) => {

                    alert("토큰이 만료되어 로그아웃 됩니다.")
                    console.error(err);
                    // history.push(window.location.pathname);
                    this.props.onLogout();
                    this.setState({
                        isReady: true,
                        authInfo: initialAuth
                    })
                })
        }
    }

    render() {
        console.log(`[${TAG}] render...`);
        let { isReady, authInfo } = this.state;
        let { loginState } = this.props;
        return (
            <div className="snuaaa-wrapper">
                <AuthContext.Provider value={authInfo}>
                    {(() => {
                        if (!isReady) {
                            return <Loading />
                        }
                        else if (!loginState && !(window.location.pathname === '/page/login' || window.location.pathname === '/page/signup')) {
                            return <Redirect to='/login' />
                        }
                        else {
                            return (
                                <Section />
                            )
                        }
                    })()}
                </AuthContext.Provider>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        loginState: state.authentication.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuthLogin: (user_id: number, nickname: string, level: number,
            profile_path: string, token: string, autoLogin: boolean) => dispatch(authLogin(user_id, nickname, level, profile_path, token, autoLogin)),
        onLogout: () => dispatch(authLogout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
