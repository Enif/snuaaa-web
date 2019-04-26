import React from 'react';
import * as service from '../../services';
import SignUpComponent from '../../components/Signup/SignUpComponent';
import SignUpSuccess from '../../components/Signup/SignUpSuccess';
import SignUpFailure from '../../components/Signup/SignUpFailure';
import Loading from '../../components/Common/Loading';
import FullScreenPortal from '../../containers/FullScreenPortal';


const TAG = 'SINGUP'

class SignUp extends React.Component {

    constructor(props) {
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
        this.formRef = React.createRef();
    }

    componentDidMount() {
    }

    uploadFile = (event) => {
        if(event.target.files[0]){
            this.setState({
                profile: event.target.files[0]
            })
        }
        else {
            this.setState({
                profile: undefined
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleMobile = (e) => {
        let showString = e.target.value.replace(/-/gi, "");
        if (e.target.value.slice(-1) === "-") {
            e.target.value = e.target.value.slice(0, -1);
        }
        if (showString.length == 4) {
            e.target.value = e.target.value.slice(0,3) + "-" + e.target.value.slice(-1);
        } else if (showString.length === 8) {
            e.target.value = e.target.value.slice(0,8) + "-" + e.target.value.slice(-1);
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    pwChecker = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if(this.state.password === e.target.value) {
            return true
        } else {
            return false
        }
    }


    postSignUp = async () => {
        console.log('[%s] postSignUp', TAG);

        let validation = true;

        for (let i = 0, max = this.formRef.current.childElementCount; i < max; i++) {
            if (!this.formRef.current[i].validity.valid) {
                this.formRef.current[i].focus();
                validation = false;
                // alert("형식이 맞지 않습니다.")
                break;
            }
        }

        if (this.state.password !== this.state.passwordCf) {
            this.formRef.current[2].focus();
            validation = false;
        }

        if (validation) {
            this.setState({ signUpState: 'LOADING' })
            const data = new FormData();
            data.append('id', this.state.id);
            data.append('password', this.state.password);
            data.append('passwordCf', this.state.passwordCf);
            data.append('username', this.state.username);
            data.append('aaaNum', this.state.aaaNum);
            data.append('schoolNum', this.state.schoolNum);
            data.append('major', this.state.major);
            data.append('email', this.state.email);
            data.append('mobile', this.state.mobile);
            data.append('introduction', this.state.introduction);
            if (this.state.profile) {
                data.append('profile', this.state.profile);
            }

            await service.postSignUp(data)
                .then((response) => {
                    console.log('Sign up Success!!');
                    console.log(response);
                    this.setState({ signUpState: 'SUCCESS' })
                })
                .catch((response) => {
                    console.log('Sign up Fail T-T')
                    console.log(response);
                    this.setState({ signUpState: 'FAILURE' })
                })
        }
    }

    render() {
        return (
            <div>
                {
                    (() => {
                        if (this.state.signUpState === 'READY') return (
                            <FullScreenPortal>
                                <SignUpComponent
                                    handleChange={this.handleChange}
                                    handleMobile={this.handleMobile}
                                    pwChecker={this.pwChecker}
                                    postSignUp={this.postSignUp}
                                    uploadFile={this.uploadFile}
                                    profile={this.state.profile}
                                    formRef={this.formRef}
                                />
                            </FullScreenPortal>
                            );
                        else if (this.state.signUpState === 'LOADING') return (<Loading />)
                        else if (this.state.signUpState === 'SUCCESS') return (<SignUpSuccess />)
                        else return (<SignUpFailure />)
                    })()
                }
            </div>
        )
    }
}

export default SignUp;