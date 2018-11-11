import React from 'react';
import InputText from '../Common/InputText'
// [TODO] Make defalt state & Make Oject contain UserInfo

const LogInComponent = ({id, password, handleChange, postLogIn }) => {
    return (
        <div className="login-wrapper">
            <div className="login-input-wrapper">
                {/* <input type="text" className="login-input" placeholder="ID"
                    name="id"
                    value={id}
                    onChange={handleChange} /> */}
                {/* <form> */}

                <InputText
                    className="login-input"
                    name="id"
                    value={id}
                    handleChange={handleChange}
                    placeholder="ID"
                    isRequired="true"
                />

                <input type="password" className="login-input" placeholder="PASSWORD"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onKeyDown={(e) => {if(e.keyCode == 13) postLogIn()}}
                    required />

                {/* <input type="submit" value="LOGIN" /> */}

                <button className="login-btn" onClick={postLogIn}>LOGIN</button>
                {/* </form> */}
                <p>아이디 찾기 / 비밀번호 초기화</p>
            </div>      
        </div>

    )
}

export default LogInComponent;