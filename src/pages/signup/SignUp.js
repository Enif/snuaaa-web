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
            
            signUpState: 'READY',
        }
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    postSignUp = async () => {
        console.log('[%s] postSignUp', TAG);

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
            introduction: this.state.introduction
        };

        await service.postSignUp(userInfo)
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
                    postSignUp = {this.postSignUp}  />);
                    else if (this.state.signUpState === 'SUCCESS') return (<SignUpSuccess/>)
                    else return (<SignUpFailure/>)
                })()
            }
            </div>
        )
    }
}

export default SignUp;