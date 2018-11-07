import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header'
import Aside from './components/Aside';
import Section from './containers/Section/Section';
import Footer from './components/Footer';
import { withRouter } from 'react-router';
import { loginCheck } from './actions';
import { connect } from 'react-redux';

const TAG = 'App'

class App extends Component {

    //[TODO] constructor에서 token vaild 확인하여 login state 유지 시켜줘야함.(새로고침시 로그아웃 방지)
    // App component에서 적용시 router 이동 안하는 문제로 header에 적용하였음. 추후 변경 검토
    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.checkToken();
    }

    
    componentDidMount() {
        console.log(`[%s] componentDidMount`, TAG)
    }

    checkToken = () => {
        console.log(`[%s] checkToken`, TAG)
        const token = localStorage.getItem('token')
        if(!token){
            //토큰이 없으면 logout
        }
        else {
            // 서버에 토큰 확인 , invalid => logout, valid => 로그인 유지(연장)
            this.props.onLoginCheck();
        }
    }



    render() {
        return (
            <div>
                <Header /> 
                <div id="contents-wrapper">
                    <Aside class="aside-left" />
                    <Section/>
                    {/* <Aside class="aside-right" /> */}
                </div>
                <Footer />
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
        onLoginCheck: () => dispatch(loginCheck())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//export default connect(undefined, mapDispatchToProps)(App);