import React from 'react';
import * as service from '../../services';
import Image from '../../components/Common/Image';
import Loading from '../../components/Common/Loading';
import imgDefaultProfile from '../../assets/img/profile.png';

const TAG = 'USERINFO'

class UserInfo extends React.Component {

    constructor(props){
        console.log(`[%s] Constructor`, TAG);
        super(props);

        this.state = {
            id: '',
            username: '',
            aaaNum: '',
            schoolNum: '',
            major: '',
            email: '',
            mobile: '',
            introduction: '',
            profileImg: null,
            profilePath: '',
            isShow: false
        }

        this.getUserInfo()
    }

    getUserInfo = async () => {
        console.log('[%s] getUserInfo', TAG);
        await service.retrieveUserInfo()
        .then((response) => {
            console.log('[%s] getUserInfo succeess', TAG);
            let userInfo = response.data.userInfo
            this.setState({
                ...this.state,
                id: userInfo.user_id,
                username: userInfo.name,
                aaaNum: userInfo.aaa_no,
                schoolNum: userInfo.col_no,
                major: userInfo.major,
                email: userInfo.email,
                mobile: userInfo.mobile,
                introduction: userInfo.introduction,
                profilePath: userInfo.profile_path,
                isShow: true
            });
        })
        .catch((response) => {
            console.log('[%s] getUserInfo fail', TAG);
        })
    }

    render() {
        let { isShow } = this.state;

        console.log('[%s] render..', TAG);
        console.log(this.state.profilePath)

        return (
            <React.Fragment>
            {
                isShow ?
                (
                    <div className="enif-section-wrapper">
                        <h2>UserInfo</h2>
                        <div className="userinfo-wrapper">
                            <Image imgSrc={this.state.profilePath} defaultImgSrc={imgDefaultProfile} />

                            <h3>{this.state.id}</h3>
                            <table>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td>이름</td>
                                        <td>{this.state.username}</td>
                                    </tr>
                                    <tr>
                                        <td>동아리번호</td>
                                        <td>{this.state.aaaNum}</td>
                                    </tr>
                                    <tr>
                                        <td>학번</td>
                                        <td>{this.state.schoolNum}</td>
                                    </tr>
                                    <tr>
                                        <td>전공</td>
                                        <td>{this.state.major}</td>
                                    </tr>
                                    <tr>
                                        <td>email</td>
                                        <td>{this.state.email}</td>
                                    </tr>
                                </tbody>
                            </table>                        
                        </div>
                    </div>
                )
                :
                (
                    <Loading/>
                )
            }
            </React.Fragment>
        )
    }
}

export default UserInfo;