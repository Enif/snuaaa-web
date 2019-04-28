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
            validAll: false,
            validAgree: false,
            validId: false,
            dupId: true,
            validPw: false,
            validPwCf: false,
            validUsername: false,
            validAaaNum: false,
            validSchoolNum: false,
            validMajor: false,
            validEmail: false,
            validMobile: false,
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

    handleCheckBox = (e) => {
        this.setState({
            [e.target.name]: e.target.checked,
            validAgree: e.target.checked
        });
    }

    handleChange = (e) => {
        let re = new RegExp(e.target.pattern);

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleId = (e) => {
        let re = new RegExp(e.target.pattern);
        
        this.setState({
            [e.target.name]: e.target.value,
            validId: re.test(e.target.value)
        });
    }

    blurId = (e) => {
        service.duplicateCheck(e.target.value)
        .then((res) => {
            console.log("Available ID");
            this.setState({
                dupId: true
            });
        })
        .catch((res) => {
            console.log('Existing ID');
            this.setState({
                dupId: false
            });
        });
    }

    handlePw = (e) => {
        let re = new RegExp(e.target.pattern);
        
        this.setState({
            [e.target.name]: e.target.value,
            validPw: re.test(e.target.value)
        });
    }
    
    pwChecker = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            validPwCf: this.state.password === e.target.value
        });
        return this.state.password === e.target.value
    }

    handleUsername = (e) => {
        let re = new RegExp(e.target.pattern);
        
        this.setState({
            [e.target.name]: e.target.value,
            validUsername: re.test(e.target.value)
        });
    }

    handleEmail = (e) => {
        let re = new RegExp(e.target.pattern);
        
        this.setState({
            [e.target.name]: e.target.value,
            validEmail: re.test(e.target.value)
        });
    }
    
    handleMobile = (e) => {
        let re = new RegExp(e.target.pattern);
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
            [e.target.name]: e.target.value,
            validMobile: re.test(e.target.value)
        })
    }
    


    postSignUp = async () => {
        console.log('[%s] postSignUp', TAG);

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

    render() {
        return (
            <div>
                {
                    (() => {
                        if (this.state.signUpState === 'READY') return (
                            <FullScreenPortal>
                                <SignUpComponent
                                    validAll = {this.state.validUsername && this.state.validAgree &&
                                                this.state.validEmail && this.state.validId &&
                                                this.state.validPwCf && this.state.validMobile &&
                                                this.state.validPw}
                                    dupId = {this.state.dupId}
                                    handleChange={this.handleChange}
                                    handleCheckBox={this.handleCheckBox}
                                    handleId={this.handleId}
                                    blurId={this.blurId}
                                    handlePw={this.handlePw}
                                    pwChecker={this.pwChecker}
                                    handleUsername={this.handleUsername}
                                    handleEmail={this.handleEmail}
                                    handleMobile={this.handleMobile}
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