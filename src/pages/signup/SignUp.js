import React from 'react';
import * as service from '../../services';
import SignUpComponent from '../../components/Signup/SignUpComponent';
import SignUpSuccess from '../../components/Signup/SignUpSuccess';
import SignUpFailure from '../../components/Signup/SignUpFailure';

const TAG = 'SINGUP'

class SignUp extends React.Component {

    
    constructor(props){
        super(props);
        
        this.state = {
            id: '',
            password: '',
            passwordCf: '',
            username: '',
            aaaNum: '',
            schoolNum: '',
            major: '',
            email: '',
            mobile: '',
            introduction: '',
            profile: null,
            signUpState: 'READY',
        }
        //this.profileRef = React.createRef();
        
    }


    uploadFile = (event) => {
        this.state.profile = event.target.files[0];
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    postSignUp = async () => {
        console.log('[%s] postSignUp', TAG);

        // if(this.state.profile !== null) {
        //     let Pfile = new File([]. );
        // }

        let userInfo = {
            id: this.state.id,
            password: this.state.password,
            passwordCf: this.state.passwordCf,
            username: this.state.username,
            aaaNum: this.state.aaaNum,
            schoolNum: this.state.schoolNum,
            major: this.state.major,
            email: this.state.email,
            mobile: this.state.mobile,
            introduction: this.state.introduction,
            profile: this.state.profile,
        };

        const data = new FormData();
        data.append('id', this.state.id);
        data.append('password', this.state.password);
        if(this.state.profile) {
            data.append('profile', this.state.profile);
        }
//        data.append('profile', this.profileRef.current.files[0]);

        await service.postSignUp(data)
        .then((response) => {
            console.log('Sign up Success!!');
            console.log(response);
            this.setState({ signUpState: 'SUCCESS'})
        })
        .catch((response) => {
            console.log('Sign up Fail T-T')
            console.log(response);
            this.setState({ signUpState: 'FAILURE'})
        })
    }

    render() {
        return (
            
            <div>
            {
                (() => {
                    if (this.state.signUpState === 'READY') return (
                    <SignUpComponent
                    handleChange = {this.handleChange}
                    postSignUp = {this.postSignUp}
                    uploadFile = {this.uploadFile}
                    /* profileRef = {this.profileRef} */  />);
                    else if (this.state.signUpState === 'SUCCESS') return (<SignUpSuccess/>)
                    else return (<SignUpFailure/>)
                })()
            }
            </div>
        )
    }
}

export default SignUp;