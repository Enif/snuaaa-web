import React from 'react';
import UserService from 'services/UserService';
import InputField from 'components/Common/InputField';

class EditPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: [
                {
                    label: 'pw',
                    value: '',
                    valid: null,
                    regExp: '^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9^()@$!%*#?&]{8,20}$'
                },
                {
                    label: 'nPw',
                    value: '',
                    valid: null,
                    regExp: '^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9^()@$!%*#?&]{8,20}$'
                },
                {
                    label: 'nPwCf',
                    value: '',
                    valid: null
                }
            ],
            isCanSubmit: false
        }
    }

    findInfo = (label) => {
        const { userInfo } = this.state;
        let info = userInfo.find(info => info.label === label);
        return info;
    }

    handleChange = (e) => {
        const { userInfo } = this.state;

        this.setState({
            userInfo: userInfo.map((info) => {
                if (info.label === e.target.name) {
                    if (info.regExp) {
                        let re = new RegExp(info.regExp);
                        let valid = e.target.value ? re.test(e.target.value) : null;
                        if (info.label === 'nPw') {
                            if (e.target.value !== this.findInfo('nPwCf').value) {
                                this.findInfo('nPwCf').valid = false;
                            }
                            else {
                                this.findInfo('nPwCf').valid = true;
                            }
                        }    
                        return { ...info, value: e.target.value, valid: valid }
                    }
                    else if (info.label === 'nPwCf') {
                        if (this.findInfo('nPw').value !== e.target.value) {
                            return { ...info, value: e.target.value, valid: false }
                        }
                        else {
                            return { ...info, value: e.target.value, valid: true }
                        }
                    } 
                    else {
                        return { ...info, value: e.target.value }
                    }
                }
                else {
                    return info;
                }
            })
        });
    }

    checkValid = () => {
        let valid = true;
        const { userInfo } = this.state;
        userInfo.forEach((info) => {
            valid = valid && info.valid;
        })
        return valid;
    }

    submit = async () => {
        const { userInfo } = this.state;

        let pwInfo, nPwInfo, nPwCfInfo;
        userInfo.forEach((info) => {
            if(info.label === 'pw') {
                pwInfo = info;
            }
            else if (info.label === 'nPw') {
                nPwInfo = info;
            }
            else if (info.label === 'nPwCf') {
                nPwCfInfo = info;
            }
            else ;
        })


        const data = {
            password: pwInfo.value,
            newPassword: nPwInfo.value,
            newPasswordCf: nPwCfInfo.value
        }

        await UserService.updatePassword(data)
        .then(() => {
            alert("비밀번호가 변경되었습니다.")
            window.location.reload();
        })
        .catch((err) => {
            if(err.response && err.response.data) {
                if(err.response.data.code === 1011) {
                    alert("현재 비밀번호가 일치하지 않습니다.");
                }
                else if (err.response.data.code === 1012) {
                    alert("새 비밀번호를 입력해주세요.");    
                }
                else if (err.response.data.code === 1013) {
                    alert("비밀번호 확인이 일치하지 않습니다.");    
                }
                else if (err.response.data.code === 1014) {
                    alert("비밀번호 양식이 일치하지 않습니다.");    
                }
                else {
                    alert("비밀번호 변경 실패.") 
                }
            }
            else {
                alert("비밀번호 변경 실패.") 
            }
            console.error(err);
        });
    }


    render() {

        const { handleChange } = this;
        const { userInfo } = this.state;
        const isCanSubmit = this.checkValid();

        let pwInfo, nPwInfo, nPwCfInfo;
        userInfo.forEach((info) => {
            if(info.label === 'pw') {
                pwInfo = info;
            }
            else if (info.label === 'nPw') {
                nPwInfo = info;
            }
            else if (info.label === 'nPwCf') {
                nPwCfInfo = info;
            }
            else ;
        })

        return (
            <div className="profile-wrapper">
                <InputField
                    label="기존 비밀번호"
                    type="password"
                    name="pw"
                    value={pwInfo.value}
                    valid={pwInfo.valid}
                    required={true}
                    handleChange={handleChange}
                    invalidMessage="8-20자리의 영문/숫자/특수문자" 
                     />
                <InputField
                    label="새 비밀번호"
                    name="nPw"
                    type="password"
                    value={nPwInfo.value}
                    valid={nPwInfo.valid}
                    required={true}
                    handleChange={handleChange}
                    invalidMessage="8-20자리의 영문/숫자/특수문자" />
                <InputField
                    label="새 비밀번호 확인"
                    name="nPwCf"
                    type="password"
                    value={nPwCfInfo.value}
                    valid={nPwCfInfo.valid}
                    required={true}
                    handleChange={handleChange}
                    invalidMessage="새 비밀번호와 일치하지 않습니다." />

                <div className="btn-wrapper">
                    <button className="btn-save" disabled={!isCanSubmit} onClick={this.submit}>저장</button>
                </div>
            </div>

        )
    }
}


export default EditPassword;
