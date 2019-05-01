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

        console.log(`[${TAG}] constructor`)
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
                    label: 'password',
                    value: '',
                    valid: null,
                    isRequired: true,
                    regExp: '^[A-Za-z0-9]{4,12}$'
                },
                {
                    label: 'passwordCf',
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
                    label: 'aaaNum',
                    value: '',
                    valid: null,
                    isRequired: false,
                    regExp: '^[0-9]{2}[Aa]{3}-[0-9]{1,3}|[Aa]{3}[0-9]{2}-[0-9]{1,3}$'
                },
                {
                    label: 'schoolNum',
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

            signUpState: 'READY',
            profile: null,
            dupId: false,
            isTermAgree: false
        }
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
            isTermAgree: e.target.checked
        });
    }

    findInfo = (label) => {
        const { userInfo } = this.state;
        let info = userInfo.find(info => info.label === label)
        return info
    }

    handleChange = (e) => {
        const { userInfo } = this.state
        this.setState({
            userInfo: userInfo.map((info) => {
                if(info.label === e.target.name) {
                    if(info.label === 'passwordCf') {
                        if(this.findInfo('password').value === e.target.value) {
                            return {...info, value: e.target.value, valid: true}
                        }
                        else {
                            return {...info, value: e.target.value, valid: false}
                        }
                    }
                    else if(info.label === 'mobile') {
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

    checkDubId = () => {

        const { userInfo } = this.state
        service.duplicateCheck({check_id: this.findInfo('id').value})
        .then((res) => {
            // Available ID
            this.setState({
                userInfo: userInfo.map((info) => {
                    if(info.label === 'id' && info.valid) {
                        return {...info, valid: true}
                    }
                    else {
                        return info;
                    }
                }),
                dupId: false
            })
        })
        .catch((res) => {
            // Existing ID
            this.setState({
                userInfo: userInfo.map((info) => {
                    if(info.label === 'id' && info.valid) {
                        return {...info, valid: false}
                    }
                    else {
                        return info;
                    }
                }),
                dupId: true
            })
        });
    }


    postSignUp = async () => {
        
        this.setState({ signUpState: 'LOADING' })
        const { userInfo } = this.state;

        const data = new FormData();
        userInfo.forEach((info) => {
            data.append(info.label, info.value)
        })

        if (this.state.profile) {
            data.append('profile', this.state.profile);
        }

        await service.postSignUp(data)
            .then(() => {
                this.setState({ signUpState: 'SUCCESS' })
            })
            .catch((err) => {
                console.error(err);
                this.setState({ signUpState: 'FAILURE' })
            })
    }

    checkValid = () => {
        let valid = true;
        const { userInfo, isTermAgree } = this.state;
        userInfo.forEach((info) => {
            if(info.isRequired || (info.valid !== null)) {
                valid = valid && info.valid;
            }
        })
        valid = valid && isTermAgree;
        return valid;
    }

    render() {
        const valid = this.checkValid();

        return (
            <div>
                {
                    (() => {
                        if (this.state.signUpState === 'READY') return (
                            <FullScreenPortal>
                                <SignUpComponent
                                    userInfo={this.state.userInfo}
                                    validAll = {valid}
                                    dupId = {this.state.dupId}
                                    handleChange={this.handleChange}
                                    handleCheckBox={this.handleCheckBox}
                                    checkDubId={this.checkDubId}
                                    postSignUp={this.postSignUp}
                                    uploadFile={this.uploadFile}
                                    profile={this.state.profile}
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