import React from 'react';
//import { Redirect } from 'react-router'
import * as service from '../../services';
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
            alert("로그인에 성공하였습니다.")
        })
        .catch((res) => {
            console.log('[%s] Log In Fail', TAG)
            alert("로그인에 실패하였습니다.\n아이디나 비밀번호를 확인해주세요.")
        })
    }

    renderRedirect = () => {

    }

    

    render() {
        return (
            <LogInComponent
            handleChange = {this.handleChange}
            postLogIn = {this.postLogIn} />
/*             <div className="login-wrapper">
            
                <div className="login-input-wrapper">
                    <input type="text" className="login-input" placeholder="ID"
                        name="id"
                        value={this.state.id}
                        onChange={this.handleChange} />

                    <input type="password" className="login-input" placeholder="PASSWORD"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange} />

                    <button className="login-btn" onClick={this.postLogIn}>LOGIN</button>
                    <p>아이디 찾기 / 비밀번호 초기화</p>
                </div>      
            </div> */
        )
    }
}

export default LogIn