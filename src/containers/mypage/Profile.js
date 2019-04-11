import React from 'react';
import * as service from '../../services';
import Loading from '../../components/Common/Loading';
import ProfileComponent from '../../components/MyPage/ProfileComponent';

const TAG = 'PROFILE'

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            username: '',
            aaa_no: '',
            col_no: '',
            major: '',
            email: '',
            mobile: '',
            introduction: '',
            profileImg: null,
            profilePath: '',
            isShow: false
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getUserInfo = async () => {
        console.log('[%s] getUserInfo', TAG);
        this.setState({
            isShow: false
        });
        await service.retrieveUserInfo()
        .then((response) => {
            console.log('[%s] getUserInfo succeess', TAG);
            let userInfo = response.data.userInfo
            this.setState({
                id: userInfo.id,
                username: userInfo.name,
                nickname: userInfo.nickname,
                aaa_no: userInfo.aaa_no,
                col_no: userInfo.col_no,
                major: userInfo.major,
                email: userInfo.email,
                mobile: userInfo.mobile,
                introduction: userInfo.introduction,
                profilePath: userInfo.profile_path,
                isShow: true
            });
        })
        .catch((err) => {
            console.log('[%s] getUserInfo fail', TAG);
            console.error(err)
        })
    }

    updateInfo = async () => {
        console.log('[%s] updateInfo', TAG);
        this.setState({
            isShow: false
        });
        const userData = {
            name: this.state.username,
            aaa_no: this.state.aaa_no,
            col_no: this.state.col_no,
            major: this.state.major,
            email: this.state.email,
            mobile: this.state.mobile,
            introduction: this.state.introduction,
        }
        await service.updateUserInfo(userData)
        .then(() => {
            alert("업데이트 성공");
            this.setState({
                isShow: true
            });
            this.getUserInfo();
        })
        .catch((err) => {
            console.error(err);
            alert("업데이트 실패")
        })
    }

    deleteUser = () => {
        alert("정말로 탈퇴하시겠습니까?")
    }

    render() {
        let {isShow, profilePath, id, username, nickname, aaa_no, col_no, major, email, mobile, introduction} = this.state
        return (
            isShow ?
            <ProfileComponent profilePath={profilePath} id={id} username={username} nickname={nickname} aaa_no={aaa_no}
            col_no={col_no} major={major} email={email} mobile={mobile} introduction={introduction} handleChange={this.handleChange}
            updateInfo={this.updateInfo} deleteUser={this.deleteUser} />
            :
            <Loading />
        )
    }
}

export default Profile;