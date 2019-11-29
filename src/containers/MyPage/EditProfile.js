import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from 'actions';

import UserService from 'services/UserService';
import Loading from 'components/Common/Loading';
import ProfileComponent from 'components/MyPage/ProfileComponent';

const TAG = 'PROFILE'

class EditProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: [
                {
                    label: 'id',
                    value: '',
                    valid: null,
                    isRequired: true,
                    regExp: '^[A-Za-z0-9]{4,12}$'
                },
                {
                    label: 'nickname',
                    value: '',
                    valid: null,
                    isRequired: true,
                    regExp: '^[A-Za-z0-9]{4,12}$'
                },
                {
                    label: 'username',
                    value: '',
                    valid: null,
                    isRequired: true,
                    regExp: '^[가-힣]{2,6}$|^[A-Za-z ]{2,20}$'
                },
                {
                    label: 'email',
                    value: '',
                    valid: null,
                    isRequired: true,
                    regExp: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
                },
                {
                    label: 'mobile',
                    value: '',
                    valid: null,
                    isRequired: true,
                    regExp: '^[0-9]{3}-[0-9]{4}-[0-9]{4}$'
                },
                {
                    label: 'aaa_no',
                    value: '',
                    valid: null,
                    isRequired: false,
                    regExp: '^[0-9]{2}[Aa]{3}-[0-9]{1,3}|[Aa]{3}[0-9]{2}-[0-9]{1,3}$'
                },
                {
                    label: 'col_no',
                    value: '',
                    valid: null,
                    isRequired: false,
                    regExp: '^[0-9]{2}$'
                },
                {
                    label: 'major',
                    value: '',
                    valid: null,
                    isRequired: false
                },
                {
                    label: 'introduction',
                    value: '',
                    valid: null,
                    isRequired: false
                }
            ],
            
            profileImg: null,
            profilePath: '',
            isProfileImgChanged: false,
            isShow: false
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    findInfo = (label) => {
        const { userInfo } = this.state;
        console.log(userInfo);
        let info = userInfo.find(info => info.label === label)
        return info
    }

    handleChange = (e) => {
        const { userInfo } = this.state
        this.setState({
            userInfo: userInfo.map((info) => {
                if(info.label === e.target.name) {
                    if(info.label === 'mobile') {
                        // auto generate '-'
                        let showString = e.target.value.replace(/-/gi, "");
                        if (e.target.value.slice(-1) === "-") {
                            e.target.value = e.target.value.slice(0, -1);
                        }
                        if (showString.length === 4) {
                            e.target.value = e.target.value.slice(0,3) + "-" + e.target.value.slice(-1);
                        } else if (showString.length === 8) {
                            e.target.value = e.target.value.slice(0,8) + "-" + e.target.value.slice(-1);
                        }
                        let re = new RegExp(info.regExp);
                        let valid = re.test(e.target.value)
                        return {...info, value: e.target.value, valid: valid}
                    }
                    if(info.regExp) {
                        let re = new RegExp(info.regExp);
                        let valid = e.target.value ? re.test(e.target.value) : null
                        return {...info, value: e.target.value, valid: valid}
                    }
                    else {
                        return {...info, value: e.target.value}
                    }
                }
                else {
                    return info;
                }
            })
        })
    }

    uploadProfileImg = (e) => {
        if(e.target.files[0]) {
            this.setState({
                profileImg: e.target.files[0],
                profilePath: URL.createObjectURL(e.target.files[0]),
                isProfileImgChanged: true
            })
        }
    }

    getUserInfo = async () => {
        console.log('[%s] getUserInfo', TAG);
        this.setState({
            isShow: false
        });
        await UserService.retrieveUserInfo()
        .then((response) => {
            let resInfo = response.data.userInfo
            const { userInfo } = this.state
            this.setState({
                userInfo: userInfo.map((info) => {
                    if(info.label === 'id') {
                        info.value = resInfo.id
                    }
                    if(info.label === 'nickname') {
                        info.value = resInfo.nickname
                    }
                    if(info.label === 'username') {
                        info.value = resInfo.username 
                    }
                    if(info.label === 'aaa_no') {
                        info.value = resInfo.aaa_no
                    }
                    if(info.label === 'col_no') {
                        info.value = resInfo.col_no
                    }
                    if(info.label === 'major') {
                        info.value = resInfo.major 
                    }
                    if(info.label === 'email') {
                        info.value = resInfo.email
                    }
                    if(info.label === 'mobile') {
                        info.value = resInfo.mobile
                    }
                    if(info.label === 'introduction') {
                        info.value = resInfo.introduction
                    }
                    return {...info, valid:true}
                }),
                profilePath: resInfo.profile_path,
                isProfileImgChanged: false,
                isShow: true
            });
        })
        .catch((err) => {
            console.error(err)
        })
    }

    updateInfo = async () => {
        console.log('[%s] updateInfo', TAG);
        this.setState({
            isShow: false
        });
        const { userInfo } = this.state;

        // const data = {};
        // userInfo.forEach((info) => {
        //     data[info.label] = info.value;
        // });

        const data = new FormData();
        userInfo.forEach((info) => {
            data.append(info.label, info.value)
        })

        if (this.state.profileImg) {
            data.append('profileImg', this.state.profileImg)
        }

        await UserService.updateUserInfo(data)
        .then(() => {
            alert("업데이트 성공");
            window.location.reload();
        })
        .catch((err) => {
            console.error(err);
            alert("업데이트 실패")
        })
    }

    deleteUser = async () => {
        let goDrop = window.confirm("정말로 탈퇴하시겠습니까?");
        if(goDrop) {
            await UserService.deleteUserInfo()
            .then(() => {
                alert("탈퇴 요청이 정상적으로 처리되었습니다.");
                this.props.onLogout();
            })
            .catch((err) => {
                console.error(err);
                alert("탈퇴 실패");
            })
        }
    }

    checkValid = () => {
        let valid = true;
        const { userInfo } = this.state;
        userInfo.forEach((info) => {
            if(info.isRequired || (info.valid !== null)) {
                valid = valid && info.valid;
            }
        })
        return valid;
    }

    render() {
        console.log(`[${TAG}] render..`)
        const { userInfo, profilePath, isProfileImgChanged, isShow }= this.state
        const valid = this.checkValid();

        return (
            isShow ?
            <ProfileComponent profilePath={profilePath} userInfo={userInfo} handleChange={this.handleChange} uploadProfileImg={this.uploadProfileImg}
                            isProfileImgChanged={isProfileImgChanged} updateInfo={this.updateInfo} deleteUser={this.deleteUser} valid={valid}/>
            :
            <Loading />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(EditProfile);
