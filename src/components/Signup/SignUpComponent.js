import React from 'react';
import InputField from '../Common/InputField';

const printProfile = function(profile) {
    if(profile) {
        if(profile.name.length > 10) {
            return profile.name.substring(0, 10) + "...";
        }
        else {
            return profile.name;
        }
    }
    else {
        return "선택된 파일 없음"
    }
}

// [TODO] Make defalt state & Make Oject contain UserInfo
const SignUpComponent = ({ userInfo, validAll, dupId, checkDubId,  
                            handleCheckBox, handleChange,
                            postSignUp, profile, uploadFile }) => {

    let idInfo, pwInfo, pwCfInfo, usernameInfo,
    emailInfo, mobileInfo, aaaNumInfo, schoolNumInfo,
    majorInfo, introInfo = null;

    userInfo.forEach(info => {
        if(info.label === 'id') {
            idInfo = info;
        }
        else if(info.label === 'password') {
            pwInfo = info;
        }
        else if(info.label === 'passwordCf') {
            pwCfInfo = info;
        }
        else if(info.label === 'username') {
            usernameInfo = info;
        }
        else if(info.label === 'email') {
            emailInfo = info;
        }
        else if(info.label === 'mobile') {
            mobileInfo = info;
        }
        else if(info.label === 'aaaNum') {
            aaaNumInfo = info;
        }
        else if(info.label === 'schoolNum') {
            schoolNumInfo = info;
        }
        else if(info.label === 'major') {
            majorInfo = info;
        }
        else if(info.label === 'introduction') {
            introInfo = info;
        }
        else {
            return new Error('userInfo Error..')
        }
    });
    
    return (
        <div className="sign-up-wrapper">
            <h2>JOIN</h2>

            <div className="div-agreement">
                <h3>가입안내</h3>
                <p>
                    안녕하세요? 서울대학교 아마추어 천문회 - AAA - 의 홈페이지에 오신것을 환영합니다!
                    <br/><br/>
                    지금 가입하려고 하는 사이트는 AAA인들이 온라인활동을 하는 공간으로,
                    회원들의 개인정보 보호와 원활한 커뮤니티 활동을 위하여 몇가지 지켜주셔야 할 사항들이 있습니다.
                    <br/><br/>
                    귀찮으시더라도 아래 주의사항을 잘 읽어주시고 가입하여 주시기 바랍니다.
                    <br/><br/><br/>
                    1. 본 사이트는 실명제입니다.
                    <br/><br/>
                    따라서 실명으로 가입하지 않으시는 회원님은 강제 탈퇴조치 될 수 있으니, 주의하시기 바랍니다.
                    <br/><br/><br/>
                    2. 본 사이트는 회원등급제를 실시합니다.
                    <br/><br/>
                    회원들의 개인정보를 보호하고 자유로운 커뮤니티 활동을 보장하기 위하여
                    소정의 자격요건을 만족하시지 못하는 분들은 몇몇 기능을 사용하실 수 없습니다.
                    <br/><br/><br/>
                    ☆ 회원등급별 권한
                    <br/><br/>
                    Lv10 : 비회원. 동아리원들의 커뮤니티를 위한 부분을 제외하고 이용 가능.
                    <br/>
                    Lv9 : AAA 회원 인증이 안된 회원. 비회원과 권한이 같다.
                    <br/>
                    Lv8 : 정보기입이 미비한 AAA 회원. 회원정보 보기를 제외한 모든 기능 이용가능.
                    <br/>
                    Lv7 : AAA 회원. 모든 기능 이용가능.
                    <br/><br/>

                    AAA 회원임을 확인하기 위하여 가입번호를 인증 수단으로 사용합니다.
                    가입번호는 정확한 번호를 체크하는 것이 아니라 양식을 확인하므로 잡기장 필명과 유사하게 적어주시면 됩니다.
                    정확한 양식으로 제출시 Lv 8로 가입처리가 됩니다.
                    이후 입력된 회원정보가 충분하다고 생각하면 Lv 7로 올려드립니다.
                    <br/><br/>
                    다만, AAA의 회원은 아니나 AAA와 관련이 있는 분인 경우에는,
                    추후 메뉴를 마련하도록 하겠습니다.
                    <br/><br/>
                    그리고, AAA 회원이지만 가입번호 양식을 모르시는 분들 역시,
                    가입 후에 운영자에게 게시판에 소개글을 올려 주시면 확인 후 등급을 조절해드리겠습니다.
                    <br/><br/>
                    3. 회원 가입 시에는 학번과 학과, 전화번호를 필히 입력하여 주십시오.
                    신원 확인을 위한 것이니 필히 입력해주시기 바랍니다.
                    미입력시에는 Lv 9로 강제 조정됩니다.
                    <br/><br/>
                    AAA 홈페이지에서 즐거운 시간 보내십시오. 감사합니다.
                    <br/>
                    문의사항이 있을 시에는 snuaaa@gmail.com 으로 메일 보내주십시오.
                </p>
            </div>

            <div className="signup-input-wrapper">
                <p className="enif-text-right">위의 가입안내문에 동의합니다.
                <input className="checkbox-signup" name="isAgree" onChange={handleCheckBox} type="checkBox" /></p>

                <InputField label="아이디*" name="id" handleChange={handleChange} handleBlur={checkDubId} required={true} valid={idInfo.valid}
                    invalidMessage={dupId ? "이미 사용중인 ID입니다" : "4-12자리의 영문 혹은 숫자"}/> 
                <InputField label="비밀번호*" type="password" name="password" handleChange={handleChange} required={true} valid={pwInfo.valid} 
                    invalidMessage="4-12자리의 영문 혹은 숫자"/>
                <InputField label="비밀번호확인*" type="password" name="passwordCf" handleChange={handleChange} required={true} valid={pwCfInfo.valid}
                    invalidMessage="비밀번호가 일치하지 않습니다."/>
                <InputField label="이름*" name="username" handleChange={handleChange} required={true} valid={usernameInfo.valid}
                    invalidMessage="2-6자의 한글 / 2-20 Alphabets"/>
                <InputField label="E-mail*" type="email" name="email" handleChange={handleChange} valid={emailInfo.valid} required={true}
                    maxLength="30" invalidMessage="이메일 형식에 맞게 입력해주세요"/>
                <InputField label="Mobile*" name="mobile" handleChange={handleChange} required={true} valid={mobileInfo.valid}
                    invalidMessage="전화번호 형식에 맞게 입력해주세요(000-0000-0000)"/>
                <InputField label="동아리 가입번호" name="aaaNum" handleChange={handleChange} valid={aaaNumInfo.valid}
                    invalidMessage="가입번호 형식에 맞게 입력해주세요. 동아리 회원이 아닌 경우, 입력하지 않으셔도 됩니다."/>
                <InputField label="학번" name="schoolNum" handleChange={handleChange} valid={schoolNumInfo.valid}
                    invalidMessage="두자리 숫자로 입력해주세요 ex) 10 "/>
                <InputField label="학과" name="major" handleChange={handleChange} />

                <div className="enif-input-field profile-signup">
                    <label htmlFor="profile">
                        <span>Profile</span>
                        <span>{printProfile(profile)}</span>
                        <div className="btn-profile">파일선택</div>
                    </label>
                    <input
                        type="file"
                        id="profile"
                        name="profile"
                        accept="image/*"
                        onChange={(e) => uploadFile(e)}
                    />
                </div>
                <div className="enif-input-field">
                    <label>자기소개</label>
                    <textarea name="introduction" onChange={handleChange}/>
                </div>
            <button disabled={!validAll} className="enif-btn-common-rec signup-btn" onClick={postSignUp}>회원가입</button>
            </div>
        </div>
    )
}


export default SignUpComponent;