import React from 'react';

// [TODO] Make defalt state & Make Oject contain UserInfo

const LogInComponent = ({id, password, handleChange, postLogIn }) => {
    return (
        <div className="login-wrapper">
            <div className="login-input-wrapper">
                <input type="text" className="login-input" placeholder="ID"
                    name="id"
                    value={id}
                    onChange={handleChange} />

                <input type="password" className="login-input" placeholder="PASSWORD"
                    name="password"
                    value={password}
                    onChange={handleChange} />

                <button className="login-btn" onClick={postLogIn}>LOGIN</button>
                <p>아이디 찾기 / 비밀번호 초기화</p>
            </div>      
        </div>

    )
}

export default LogInComponent;