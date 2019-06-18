import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';

import './App.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

import Header from './containers/Header'
//import Aside from './components/Aside';
import Section from './containers/Section';
import Footer from './components/Footer';
import Loading from './components/Common/Loading';
import { updateToken } from './services';
import { authLogin, authLogout } from './actions';
// import UserContext from './UserContext';

const TAG = 'App'


class App extends Component {

    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.state = {
            isReady: false
        }
    }

    componentDidMount() {
        this.checkToken();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.isReady === false) {
            return false;
        }
        return true;
    }

    checkToken = async () => {
        console.log(`[%s] checkToken`, TAG)
        const token = (sessionStorage.getItem('token') || localStorage.getItem('token'))
        if(!token){
            //토큰이 없으면 logout
            this.props.onLogout();
            this.setState({
                isReady: true
            })
        }
        else {
            // 서버에 토큰 확인 , invalid => logout, valid => 로그인 유지(연장)
            await updateToken()
            .then((res) => {
                console.log(`[${TAG}] Token is valid`)
                // [TODO] token에 autoLogin 정보 저장하여 사용해야 함. (현재 자동 로그인 유지 되지 않음)
                const { token, user_id, nickname, level, profile_path } = res.data;
                if(this.state.autoLogin) {
                    localStorage.setItem('token', token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                }
                else {
                    sessionStorage.setItem('token', token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
                }
                this.props.onAuthLogin(user_id, nickname, level, profile_path);
                // this.props.onLogin();
                this.setState({
                    isReady: true
                })
            })
            .catch((res) => {
                console.log(`[${TAG}] Token is not valid`)
                alert("토큰이 만료되어 로그아웃 됩니다.")
                this.props.onLogout();
                this.setState({
                    isReady: true
                })
            })
        }
    }

    render() {
        console.log(`[${TAG}] render...`);
        let { isReady } = this.state;
        let { loginState } = this.props;
        return (
            <div className="snuaaa-wrapper">
                {(() => {
                    if(!isReady) {
                        return <Loading />
                    }
                    else if (!loginState && !( window.location.pathname === '/page/login' || window.location.pathname === '/page/signup')) {
                        return <Redirect to='/login' />
                    }
                    else {
                        return (
                            <>
                                <Header /> 
                                <div className="section-wrapper">
                                    {/* <Aside class="aside-left" /> */}
                                    <Section/>
                                    {/* <Aside class="aside-right" /> */}
                                </div>
                                <Footer />
                            </>
                        )
                    }
                })()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.authentication.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthLogin: (user_id, nickname, level, profile_path) => dispatch(authLogin(user_id, nickname, level, profile_path)),
        onLogout: () => dispatch(authLogout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
