import React from 'react';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';

import './App.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

import Section from './containers/Section';
import Loading from './components/Common/Loading';
import { getToken, setToken, removeToken } from './utils/tokenManager';
import AuthService from './services/AuthService';
// import history from './common/history';
import AuthContext from './contexts/AuthContext';
import AuthType from './types/AuthType';
import BoardType from './types/BoardType';
import UserType from './types/UserType';

const TAG = 'App'

type AppState = {
    isReady: boolean;
    authInfo: AuthType;
    boardInfo: BoardType[];
}

const initialAuth: AuthType = {
    isLoggedIn: false,
    user: {
        user_id: 0,
        nickname: '',
        level: 0,
        profile_path: '',
    }
};


class App extends React.Component<RouteComponentProps, AppState> {

    constructor(props: RouteComponentProps) {
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

    checkToken = async () => {
        const accessToken = getToken();
        const { history } = this.props;
        if (!accessToken) {
            //토큰이 없으면 logout
            history.replace({
                pathname: '/login',
                state: { accessPath: history.location.pathname }
            })
            this.authLogout();
            this.setState({
                isReady: true
            })
        }
        else {
            // 서버에 토큰 확인 , invalid => logout, valid => 로그인 유지(연장)
            await AuthService.checkToken()
                .then((res: any) => {
                    const { token, userInfo, autoLogin } = res.data;
                    this.authLogin(token, autoLogin, userInfo)
                })
                .catch((err: Error) => {
                    alert("토큰이 만료되어 로그아웃 됩니다.")
                    console.error(err);
                    this.authLogout();
                })
        }
    }

    authLogin = (token: string, autoLogin: boolean, userInfo: UserType) => {
        setToken(token, autoLogin);
        this.setState({
            isReady: true,
            authInfo: {
                isLoggedIn: true,
                user: userInfo
            }
        })
    }

    authLogout = () => {
        removeToken();
        this.setState({
            isReady: true,
            authInfo: {
                isLoggedIn: false,
                user: {
                    user_id: 0,
                    nickname: '',
                    level: 0,
                    profile_path: '',
                }
            }
        })
    }

    render() {
        console.log(`[${TAG}] render...`);
        let { isReady, authInfo } = this.state;
        return (
            <div className="snuaaa-wrapper">
                <AuthContext.Provider value={{
                    authInfo: authInfo,
                    authLogin: this.authLogin,
                    authLogout: this.authLogout
                }}>
                    {(() => {
                        if (!isReady) {
                            return <Loading />
                        }
                        else if (!authInfo.isLoggedIn && !(window.location.pathname === '/page/login' || window.location.pathname === '/page/signup')) {
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


export default withRouter(App);
