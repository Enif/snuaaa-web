import React from 'react';
import InputText from '../Common/InputText'
import logo from '../../assets/img/logo.png'
// [TODO] Make defalt state & Make Oject contain UserInfo

const LogInComponent = ({id, password, handleChange, postLogIn }) => {
    return (
        <div className="login-wrapper">
            <div className="logo-wrapper">
                <img src={logo} />
                <h2>LOG IN</h2>
            </div>
            <div className="inputs-wrapper">
                <div className="auto-checker">
                    <input type="checkbox" /> <p>자동 로그인</p>
                </div>
                <div className="login-inputs-wrapper">
                    <div className="login-inputs">
                        <InputText
                            className="login-input"
                            name="id"
                            value={id}
                            handleChange={handleChange}
                            placeholder=" ID"
                            isRequired="true"
                        />
                        <input type="password" className="login-input" placeholder=" PASSWORD"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onKeyDown={(e) => {if(e.keyCode == 13) postLogIn()}}
                            required />
                    </div>
                    <button className="login-btn" onClick={postLogIn}>로그인</button>
                </div>
                <div>
                    <button className="btn-guest">Geust</button>
                    <p className="menu-txt">아이디 찾기 / 비밀번호 초기화</p>
                </div>
                

                
                {/* <input type="text" className="login-input" placeholder="ID"
                    name="id"
                    value={id}
                    onChange={handleChange} /> */}
                {/* <form> */}
                

                {/* <input type="submit" value="LOGIN" /> */}

                
                {/* </form> */}
            </div>      
        </div>

    )
}

export default LogInComponent;