import React from 'react';
import * as service from '../../services';
import Loading from '../../components/Common/Loading';
import imgDefaultProfile from '../../assets/img/profile.png'

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
            isShow: false
        }

        this.getUserInfo()
        .then(() =>{
            this.getUserProfile()
        })
    }

    getUserInfo = async () => {
        console.log('[%s] getUserInfo', TAG);
        await service.getUserInfo(localStorage.getItem("token"))
        .then((response) => {
            console.log('[%s] getUserInfo succeess', TAG);
            console.log(response);
            let { account } = response.data
            this.setState({
                ...this.state,
                id: account.id,
                username: account.username,
                aaaNum: account.aaaNum,
                schoolNum: account.schoolNum,
                major: account.major,
                email: account.email,
                mobile: account.mobile,
                introduction: account.introduction,
                isShow: true
            });
        })
        .catch((response) => {
            console.log('[%s] getUserInfo fail', TAG);
            console.log(response);
        })
    }

    getUserProfile = async () => {
        console.log('[%s] getUserProfile', TAG);

        

        await service.getUserProfile(localStorage.getItem("token"))
        .then((response) => {
            console.log('[%s] getUserProfile succeess', TAG);

//            let profile = new Image();
//            profile.src = response.data;
//            profile.src = 'http://localhost:8080/api/userinfo/profile'

            this.setState({
                profileImg: response.data
            })
        })
        .catch((response) => {
            console.log('[%s] getUserProfile fail', TAG);
            console.log(response);
        })
    }

    render() {
        let { isShow } = this.state;

        return (
            <React.Fragment>
            {
                isShow ?
                (
                    <div className="enif-section-wrapper">
                        <h2>UserInfo</h2>
                        <div className="userinfo-wrapper">
                            {/* {this.state.profileImg ? this.state.profileImg : <img src={imgDefaultProfile} />} */}
                            <img src={this.state.profileImg ? this.state.profileImg : imgDefaultProfile}/>
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