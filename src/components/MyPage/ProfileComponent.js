import React from 'react';
import Image from '../Common/Image';
import InputField from '../Common/InputField';
import imgDefaultProfile from '../../assets/img/profile.png';

const ProfileComponent = ({profilePath, id, username, nickname, aaa_no, col_no, major, email, mobile, introduction, handleChange, updateInfo, deleteUser}) => {
    return (
        <div className="profile-wrapper">
            <div className="profile-img-wrapper">
                <Image imgSrc={profilePath} defaultImgSrc={imgDefaultProfile} />
                <h5>{nickname}</h5>
            </div>

                <InputField label="ID" name="id" value={id} disabled={true}/>
                <InputField label="이름" name="username" value={username} required={true}
                handleChange={handleChange} pattern="^[A-Za-z가-힣]{2,5}$" invalidMessage="2-10자의 한글 혹은 영문" />
                <InputField label="E-mail" name="email" value={email} handleChange={handleChange} maxLength={30}
                pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" invalidMessage="이메일 형식에 맞게 입력해주세요"/>
                <InputField label="Mobile" name="mobile" value={mobile} pattern="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$"
                handleChange={handleChange} invalidMessage="전화번호 형식에 맞게 입력해주세요(xxx-xxxx-xxxx)"/>
                <InputField label="동아리번호" name="aaa_no" value={aaa_no} pattern="^[0-9]{2}[Aa]{3}-[0-9]{1,3}$"
                handleChange={handleChange} invalidMessage="가입번호 형식에 맞게 입력해주세요. 동아리 회원이 아닌 경우, 입력하지 않으셔도 됩니다."/>
                <InputField label="학번" name="col_no" value={col_no} handleChange={handleChange}
                pattern="^[0-9]{2}$" invalidMessage="숫자 2자리를 입력해 주세요(ex. 19)"/>
                <InputField label="전공" name="major" value={major} handleChange={handleChange}/>

                <div className="enif-input-field">
                    <label htmlFor="introduction">자기소개</label>
                    <textarea name="introduction" value={introduction} onChange={(e) => handleChange(e)}/>
                </div>
                <div className="btn-wrapper">
                    <button className="btn-withdraw" onClick={() => deleteUser()}>탈퇴하기</button>
                    <button className="btn-save" onClick={() => updateInfo()}>저장</button>
                </div>


        </div>
    )
}

export default ProfileComponent;