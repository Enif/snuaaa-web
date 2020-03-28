import React from 'react';
import UserService from 'services/UserService.ts';
import { FindStateEnum } from 'common/FindStateEnum';

class FindIdPw extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFindId: true,
            idName: '',
            idEmail: '',
            pwId: '',
            pwName: '',
            pwEmail: '',
            findState: FindStateEnum.DEFAULT
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    makeForm = () => {
        const { handleChange } = this;
        const { isFindId, idName, idEmail, pwId, pwName, pwEmail } = this.state;

        if (isFindId) {
            return (
                <>
                    <div className="popup-input-unit">
                        <label>이름</label>
                        <input name="idName" type="text" onChange={handleChange} value={idName}></input>
                    </div>
                    <div className="popup-input-unit">
                        <label>이메일</label>
                        <input name="idEmail" type="text" onChange={handleChange} value={idEmail}></input>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="popup-input-unit">
                        <label>아이디</label>
                        <input name="pwId" type="text" onChange={handleChange} value={pwId}></input>
                    </div>
                    <div className="popup-input-unit">
                        <label>이름</label>
                        <input name="pwName" type="text" onChange={handleChange} value={pwName}></input>
                    </div>
                    <div className="popup-input-unit">
                        <label>이메일</label>
                        <input name="pwEmail" type="text" onChange={handleChange} value={pwEmail}></input>
                    </div>
                </>
            )
        }

    }

    setIsFindId = (isFindId) => {
        this.setState({
            isFindId: isFindId
        })
    }

    setFindState = (state) => {
        this.setState({
            findState: state
        })
    }

    submit = async () => {
        const { setFindState } = this;
        const { isFindId, idName, idEmail, pwId, pwName, pwEmail } = this.state;

        setFindState(FindStateEnum.LOADING);

        if(isFindId) {
            const data = {
                name: idName,
                email: idEmail
            }
            try {
                let res = await UserService.findId(data);
                if (res.data.success) {
                    setFindState(FindStateEnum.IDFOUND);
                }
    
            }
            catch (err) {
                console.error(err);
                setFindState(FindStateEnum.IDNOTFOUND);
            }
        }
        else {
            const data = {
                id: pwId,
                name: pwName,
                email: pwEmail
            }
            try {
                let res = await UserService.findPw(data);
                if (res.data.success) {
                    setFindState(FindStateEnum.PWFOUND);
                }
    
            }
            catch (err) {
                console.error(err);
                setFindState(FindStateEnum.PWNOTFOUND);
            }
        }


    }

    makeMessage = () => {
        const { findState } = this.state;
        if (findState === FindStateEnum.LOADING) {
            return <p>계정확인중</p>
        }
        else if (findState === FindStateEnum.IDFOUND) {
            return <p>아이디를 회원님의 이메일로 보내드렸습니다.</p>
        }
        else if (findState === FindStateEnum.IDNOTFOUND) {
            return <p>해당 정보와 일치하는 ID가 존재하지 않습니다.</p>
        }
        else if (findState === FindStateEnum.PWFOUND) {
            return <p>임시 비밀번호를 회원님의 이메일로 보내드렸습니다.</p>
        }
        else if (findState === FindStateEnum.PWNOTFOUND) {
            return <p>해당 정보와 일치하는 계정이 존재하지 않습니다.</p>
        }
        else {
            return;
        }
    }

    render() {

        const { makeForm, submit, makeMessage, setIsFindId } = this;
        const { cancel } = this.props;
        const { isFindId } = this.state;
        let idSelectClass = `popup-selector ${isFindId ? "selected" : ""}`
        let pwSelectClass = `popup-selector ${isFindId ? "" : "selected"}`

        return (
            <div className="popup-wrapper">
                <div className="popup-box">
                    <div className="popup-star">★</div>
                    <div className="popup-selector-wrapper">
                        <div className={idSelectClass} onClick={() => setIsFindId(true)}>아이디 찾기</div>
                        <div className={pwSelectClass} onClick={() => setIsFindId(false)}>패스워드 찾기</div>
                    </div>
                    <div className="popup-contents">
                        {makeForm()}
                    </div>
                    <div>{makeMessage()}</div>
                    <div className="popup-action">
                        <button className="btn-ok" onClick={submit}>OK</button>
                        <button className="btn-cancel" onClick={cancel}>CANCEL</button>
                    </div>

                </div>
            </div>
        )
    }
}


export default FindIdPw;
