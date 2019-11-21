import React from 'react';
import { connect } from 'react-redux';

import * as service from 'services';
import { authLogin } from 'actions';
import LogInComponent from 'components/Login/LogInComponent';
import Loading from 'components/Common/Loading';
import PopUp from 'components/Common/PopUp';
import FullScreenPortal from 'containers/FullScreenPortal';
import history from 'common/history';
import FindIdPw from '../Login/FindIdPw';

const TAG = 'LOGIN'

class LogIn extends React.Component {
    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    //   };

    constructor(props) {
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
            autoLogin: e.target.checked,
            popUp: e.target.checked
        })
    }

    setAutoLoginState = (state) => {
        this.setState({
            autoLogin: state
        })
    }

    setPopUpState = (state) => {
        this.setState({
            popUp: state
        })
    }

    setFindPopUp = (state) => {
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

        this.setState({
            isLoading: true
        })
        let logInInfo = {
            id: id,
            password: password,
            autoLogin: autoLogin
        }

        await service.userLogIn(logInInfo)
            .then((res) => {
                console.log('[%s] Log In Success', TAG)
                this.setState({
                    isLoading: false
                })
                const { token, user_id, nickname, level, profile_path, autoLogin } = res.data;
                this.props.onLogin(user_id, nickname, level, profile_path, token, autoLogin);

                if(history.location.state && history.location.state.accessPath) {
                    history.push(history.location.state.accessPath)
                }
                else {
                    history.push('/');
                }
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    isLoading: false
                })
                this.makeErrPopUp()
            })
    }

    guestLogIn = async () => {

        this.setState({
            isLoading: true
        })

        await service.guestLogIn()
            .then((res) => {
                console.log('[%s] Log In Success', TAG)
                this.setState({
                    isLoading: false
                })
                const { token, user_id, nickname, level, profile_path, autoLogin } = res.data;

                this.props.onLogin(user_id, nickname, level, profile_path, token, autoLogin);
                history.push('/');
            })
            .catch((err) => {
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
                        contents={errText}
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

const mapStateToProps = (state) => {
    return {
        loginState: state.authentication.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (user_id, nickname, level, profile_path, token, autoLogin) => dispatch(authLogin(user_id, nickname, level, profile_path, token, autoLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
