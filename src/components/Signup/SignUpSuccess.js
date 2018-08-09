import React from 'react';
import { Link } from 'react-router-dom';

const SignUpSuccess = () => {
    return (
        <div>
            회원가입에 성공하셨습니다!
            로그인 버튼을 눌러서 로그인 해주세요.

            <Link to="login">
                <button>
                    LOG IN
                </button>
            </Link>
        </div>
    )
}

export default SignUpSuccess;