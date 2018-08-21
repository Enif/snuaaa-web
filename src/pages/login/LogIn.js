import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import * as service from '../../services';
import { connect } from 'react-redux'
import { authLogin } from '../../actions'
import LogInComponent from '../../components/Login/LogInComponent';

const TAG = 'LOGIN'

class LogIn extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: '',
            password: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    postLogIn = async () => {
        console.log('[%s] postLogIn', TAG);

        let logInInfo = {
            id: this.state.id,
            password: this.state.password
        }
        
        await service.postLogIn(logInInfo)
        .then((res) => {
            console.log('[%s] Log In Success', TAG)
            console.log(res);
            const { token } = res.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            this.props.onAuthLogin();

            alert("로그인에 성공하였습니다.")

        })
        .catch((res) => {
            console.log('[%s] Log In Fail', TAG)
            alert("로그인에 실패하였습니다.\n아이디나 비밀번호를 확인해주세요.")
        })
    }
 
    render() {

        const { loginState } = this.props

        return (
            
            loginState ?
            (
                <Redirect to='/' />
            ) :
            (
                <LogInComponent
                handleChange = {this.handleChange}
                postLogIn = {this.postLogIn} />
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.authentication.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthLogin: () => dispatch(authLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);