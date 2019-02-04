import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header'
import Aside from './components/Aside';
import Section from './containers/Section/Section';
import Footer from './components/Footer';
import { updateToken } from './services';
import { withRouter } from 'react-router';
import { authLogin, authLogout } from './actions';
import { connect } from 'react-redux';
import UserContext from './UserContext';

const TAG = 'App'


class App extends Component {

    //[TODO] constructor에서 token vaild 확인하여 login state 유지 시켜줘야함.(새로고침시 로그아웃 방지)
    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.checkToken();
    }

    
    componentDidMount() {
        console.log(`[%s] componentDidMount`, TAG)
    }

    checkToken = async () => {
        console.log(`[%s] checkToken`, TAG)
        const token = localStorage.getItem('token')
        if(!token){
            //토큰이 없으면 logout
            this.props.onLogout();
        }
        else {
            // 서버에 토큰 확인 , invalid => logout, valid => 로그인 유지(연장)
            await updateToken()
            .then((res) => {
                console.log(`[${TAG}] Token is valid`)
                this.props.onLogin();
            })
            .catch((res) => {
                console.log(`[${TAG}] Token is not valid`)
                alert("토큰이 만료되어 로그아웃 됩니다.")
                this.props.onLogout();
            })
            
        }
    }

    // componentWillUnmount() {
    //     console.log(`[${TAG}] componentWillUnmount`) 
    //     this.props.onLogout();
    // }



    render() {
        return (
            <div>
                <UserContext.Provider>
                    <Header /> 
                    <div id="contents-wrapper">
                        <Aside class="aside-left" />
                        <Section/>
                        {/* <Aside class="aside-right" /> */}
                    </div>
                    <Footer />
                </UserContext.Provider>
            </div>
        );
    }
}

// not used
const mapStateToProps = (state) => {
    return {
        loginState: state.authentication.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // onLoginCheck: () => dispatch(loginCheck()),
        onLogin: () => dispatch(authLogin()),
        onLogout: () => dispatch(authLogout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//export default connect(undefined, mapDispatchToProps)(App);