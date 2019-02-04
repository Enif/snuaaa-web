import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import * as service from '../../services';
import { connect } from 'react-redux'
import { authLogin } from '../../actions'
import LogInComponent from '../../components/Login/LogInComponent';
import Loading from '../../components/Common/Loading';
import PopUp from '../../components/Common/PopUp';
import FullScreenPortal from '../../containers/FullScreenPortal';

const TAG = 'LOGIN'

class LogIn extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: '',
            password: '',
            isLoading: false,
            popUp: false,
            toSignUp: false,
            autoLogin: false,
        }
        this.popupTitle = undefined;
        this.popupContents = undefined;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkAuto = (e) => {
        this.setState({
            autoLogin: e.target.checked
        })
        if(e.target.checked) {
            this.makePopUp('자동 로그인 기능을 사용하시겠습니까?',
            `자동 로그인 사용시 다음 접속부터는
            로그인을 하실 필요가 없습니다.\n
            단, 게임방, 학교 등 공공장소에서 이용 시
            개인정보가 유출될 수 있으니 주의해주세요.`)
        }
    }

    redirectToSignUp = () => {
        console.log('[%s] redirectToSignUp', TAG);
        this.props.history.push('/login');
        this.setState({
            toSignUp: true
        })
    }

    makePopUp = (title, contents) => {
        console.log(`[${TAG}] makePopUp`);
        this.popupTitle = title;
        this.popupContents = contents;
        this.setState({
            popUp: true
        })

        setTimeout(() => {
            this.setState({
            popUp: false
        })}, 1500)
    }

    postLogIn = async () => {
        console.log('[%s] postLogIn', TAG);
        this.setState({
            isLoading: true
        })
        let logInInfo = {
            id: this.state.id,
            password: this.state.password,
            autoLogin: this.state.autoLogin
        }
        
        await service.postLogIn(logInInfo)
        .then((res) => {
            console.log('[%s] Log In Success', TAG)
            this.setState({
                isLoading: false
            })
            const { token } = res.data;
            if(this.state.autoLogin) {
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            }
            else {
                sessionStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
            }
            this.props.onAuthLogin();
        })
        .catch((res) => {
            console.log('[%s] Log In Fail', TAG)
            this.setState({
                isLoading: false
            })
            this.makePopUp("", "로그인에 실패하였습니다.\n아이디나 비밀번호를 확인해주세요.")
        })
    }
 
    render() {

        const { loginState } = this.props
        const { isLoading, toSignUp, popUp } = this.state
        return (
            <>
                { loginState && <Redirect to='/' /> }
                { toSignUp && <Redirect to='/signup' /> } 
                { isLoading && <Loading/> }
                { popUp && <PopUp title={this.popupTitle} contents={this.popupContents}/> }
                <FullScreenPortal>
                    <LogInComponent
                    handleChange = {this.handleChange}
                    postLogIn = {this.postLogIn}
                    redirectToSignUp = {this.redirectToSignUp}
                    checkAuto = {this.checkAuto} />
                </FullScreenPortal>
            </>
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