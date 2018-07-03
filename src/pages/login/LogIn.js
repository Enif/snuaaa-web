import React from 'react';

class LogIn extends React.Component {

/*     constructor(props){
        super(props);
    }
 */
    render() {
        return(
            <div>
                <div className="login-input-wrapper">
                    <input type="text" className="login-input"/>
                    <input type="text" className="login-input"/>
                    <button className="login-btn">로그인</button>
                </div>
                <div>
                    <button>아이디 찾기</button>
                    <button>비밀번호 찾기</button>
                </div>
            </div>
        )
    }
}

export default LogIn