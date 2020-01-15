import React, { ChangeEvent, useState, useContext } from 'react';

import LogInComponent from '../../components/Login/LogInComponent';
import Loading from '../../components/Common/Loading';
import PopUp from '../../components/Common/PopUp';
import FullScreenPortal from '../../containers/FullScreenPortal';
// import history from '../../common/history';
import FindIdPw from '../Login/FindIdPw';
import AuthService from '../../services/AuthService';
import AuthContext from '../../contexts/AuthContext';
import { useHistory, Redirect, useLocation } from 'react-router';

const TAG = 'LOGIN'

function LogIn() {
    const [loginInfo, setLoginInfo] = useState({ id: '', password: '', autoLogin: false });
    const [isLoading, setIsLoading] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [errPopUp, setErrPopUp] = useState(false);
    const [findPopUp, setFindPopUp] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const authContext = useContext(AuthContext);
    const popUpTitle = '자동 로그인 기능을 사용하시겠습니까?';
    const popUpText = `자동 로그인 사용시 다음 접속부터는 로그인을 하실 필요가 없습니다.\n
            단, 게임방, 학교 등 공공장소에서 이용 시 개인정보가 유출될 수 있으니 주의해주세요.`;
    const errText = "로그인에 실패하였습니다.\n아이디나 비밀번호를 확인해주세요.";

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    const checkAuto = (e: ChangeEvent<HTMLInputElement>) => {
        setPopUp(e.target.checked);
        setLoginInfo({
            ...loginInfo,
            autoLogin: e.target.checked
        });
    }

    const makeErrPopUp = () => {
        setErrPopUp(true);
        setTimeout(() => {
            setErrPopUp(false)
        }, 1500)
    }

    const setAutoLogin = (isAuto: boolean) => {
        setLoginInfo({
            ...loginInfo,
            autoLogin: isAuto
        })
    }


    const userLogIn = async () => {

        // const { id, password, autoLogin } = this.state;
        // const { onAuthLogin } = this.props;
        setIsLoading(true);
        // this.setState({
        //     isLoading: true
        // })
        // authContext
        await AuthService.logIn(loginInfo)
            .then((res: any) => {
                // this.setState({
                //     isLoading: false
                // })
                const { token, userInfo, autoLogin } = res.data;
                // onAuthLogin(user_id, nickname, level, profile_path, token, autoLogin);
                authContext.authLogin(token, autoLogin, userInfo)
                // console.log('[%s] Log In Success', TAG)
                setIsLoading(false);
                if (location.state && location.state.accessPath) {
                    history.push(location.state.accessPath)
                }
                else {
                    history.push('/');
                }
            })
            .catch((err: ErrorEvent) => {
                console.error(err);
                setIsLoading(false);
                makeErrPopUp()
            })
    }

    const guestLogIn = async () => {
        setIsLoading(true);

        await AuthService.guestLogIn()
            .then((res: any) => {
                setIsLoading(false);
                const { token, userInfo, autoLogin } = res.data;
                authContext.authLogin(token, autoLogin, userInfo)
            })
            .catch((err: ErrorEvent) => {
                console.error(err);
                setIsLoading(false);
                makeErrPopUp()
            })
    }

    return (

        <>
            {isLoading && <Loading />}
            {authContext.authInfo.isLoggedIn && <Redirect to='/'/>}
            {
                findPopUp
                && <FindIdPw
                    cancel={() => setFindPopUp(false)}
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
                        setPopUp(false);
                        setAutoLogin(false);
                    }}
                    confirm={() => {
                        setPopUp(false);
                    }} />}
            <FullScreenPortal>
                <LogInComponent
                    autoLogin={loginInfo.autoLogin}
                    handleChange={handleChange}
                    userLogIn={userLogIn}
                    guestLogIn={guestLogIn}
                    openFindPopUp={() => setFindPopUp(true)}
                    checkAuto={checkAuto} />
            </FullScreenPortal>
        </>
    )
}

export default LogIn;
