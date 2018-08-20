import React from 'react';
import * as service from '../../services';

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
        }

        // this.setState({
        //     userInfo
        // }); = {
        //     id: '',
        //     username: '',
        //     aaaNum: '',
        //     schoolNum: '',
        //     major: '',
        //     email: '',
        //     mobile: '',
        //     introduction: '',
        // }

        this.getUserInfo();
    }

    getUserInfo = async () => {
        console.log('[%s] getUserInfo', TAG);
        await service.getUserInfo(localStorage.getItem("token"))
        .then((response) => {
            console.log('[%s] getUserInfo succeess', TAG);
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
            });
        })
        .catch((response) => {
            console.log('[%s] getUserInfo fail', TAG);
            console.log(response);
        })

    }
    render(){
        console.log(this.state);
        return(
            <div>
                id : {this.state.id}
                <br/>
                username : {this.state.username}
                <br/>
                aaaNum : {this.state.aaaNum}
                <br/>
                schoolNum : {this.state.schoolNum}
            </div>
        )
    }

    // 토큰을 보내면 되나??
//    getUserInfo = 
}

export default UserInfo;