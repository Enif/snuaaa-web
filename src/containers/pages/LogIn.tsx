import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { authLogin } from '../../actions';
import LogInComponent from '../../components/Login/LogInComponent';
import Loading from '../../components/Common/Loading';
import PopUp from '../../components/Common/PopUp';
import FullScreenPortal from '../../containers/FullScreenPortal';
import history from '../../common/history';
import FindIdPw from '../Login/FindIdPw';
import AuthService from '../../services/AuthService';

const TAG = 'LOGIN'

type LoginProps = {
    onAuthLogin: (user_id: number, nickname: string, level: number,
        profile_path: string, token: string, autoLogin: boolean) => void;
}

type LoginState = {
    id: string,
    password: string,
    isLoading: boolean,
    popUp: boolean,
    errPopUp: boolean,
    findPopUp: boolean,
    autoLogin: boolean,
}

class LogIn extends React.Component<LoginProps, LoginState> {
 
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            id: '',
            password: '',
            isLoading: false,
            popUp: false,
            errPopUp: false,
            findPopUp: false,
            autoLogin: false,
        }
        this.popupTitle = '';
        this.popupContents = '';
    }

    // authServie;
    popupTitle: string;
    popupContents: string;

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'id') {
            this.setState({
                id: e.target.value
            })            
        }
        else {
            this.setState({
                password: e.target.value
            })            
        }
    }

    checkAuto = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            autoLogin: e.target.checked,
            popUp: e.target.checked
        })
    }

    setAutoLoginState = (state: boolean) => {
        this.setState({
            autoLogin: state
        })
    }

    setPopUpState = (state: boolean) => {
        this.setState({
            popUp: state
        })
    }

    setFindPopUp = (state: boolean) => {
        this.setState({
            findPopUp: state
        })
    }

    makeErrPopUp = () => {
        this.setState({
            errPopUp: true
        })
        setTimeout(() => {
            this.setState({
                errPopUp: false
            })
        }, 1500)
    }

    userLogIn = async () => {

        const { id, password, autoLogin } = this.state;
        const { onAuthLogin } = this.props;

        this.setState({
            isLoading: true
        })
        let logInInfo = {
            id: id,
            password: password,
            autoLogin: autoLogin
        }

        await AuthService.logIn(logInInfo)
            .then((res: any) => {
                console.log('[%s] Log In Success', TAG)
                this.setState({
                    isLoading: false
                })
                const { token, user_id, nickname, level, profile_path, autoLogin } = res.data;
                onAuthLogin(user_id, nickname, level, profile_path, token, autoLogin);

                if(history.location.state && history.location.state.accessPath) {
                    history.push(history.location.state.accessPath)
                }
                else {
                    history.push('/');
                }
            })
            .catch((err: ErrorEvent) => {
                console.error(err);
                this.setState({
                    isLoading: false
                })
                this.makeErrPopUp()
            })
    }

    guestLogIn = async () => {
        const { onAuthLogin } = this.props;

        this.setState({
            isLoading: true
        })

        await AuthService.guestLogIn()
            .then((res: any) => {
                console.log('[%s] Log In Success', TAG)
                this.setState({
                    isLoading: false
                })
                const { token, user_id, nickname, level, profile_path, autoLogin } = res.data;

                onAuthLogin(user_id, nickname, level, profile_path, token, autoLogin);
                history.push('/');
            })
            .catch((err: ErrorEvent) => {
                console.error(err);
                this.setState({
                    isLoading: false
                })
                this.makeErrPopUp()
            })
    }

    render() {
        // const { loginState } = this.props
        const { isLoading, popUp, errPopUp, findPopUp, autoLogin } = this.state
        const popUpTitle = '자동 로그인 기능을 사용하시겠습니까?';
        const popUpText = `자동 로그인 사용시 다음 접속부터는 로그인을 하실 필요가 없습니다.\n
            단, 게임방, 학교 등 공공장소에서 이용 시 개인정보가 유출될 수 있으니 주의해주세요.`;
        const errText = "로그인에 실패하였습니다.\n아이디나 비밀번호를 확인해주세요.";


        return (
            <>
                {/* {loginState && <Redirect to='/' />} */}
                {isLoading && <Loading />}
                {
                    findPopUp
                    && <FindIdPw
                        cancel={() => this.setFindPopUp(false)}
                    />
                }
                {
                    errPopUp &&
                    <PopUp
                        title={''}
                        contents={errText}
                        isAction={false}
                        cancel={false}
                        confirm={false}
                    />
                }
                {popUp &&
                    <PopUp
                        title={popUpTitle}
                        contents={popUpText}
                        isAction={true}
                        cancel={() => {
                            this.setPopUpState(false);
                            this.setAutoLoginState(false);
                        }}
                        confirm={() => {
                            this.setPopUpState(false);
                        }} />}
                <FullScreenPortal>
                    <LogInComponent
                        autoLogin={autoLogin}
                        handleChange={this.handleChange}
                        userLogIn={this.userLogIn}
                        guestLogIn={this.guestLogIn}
                        openFindPopUp={() => this.setFindPopUp(true)}
                        checkAuto={this.checkAuto} />
                </FullScreenPortal>
            </>
        )
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
