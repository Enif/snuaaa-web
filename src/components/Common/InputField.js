import React from 'react';
import * as service from '../../services';

class InputField extends React.Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
        this.re = new RegExp(this.props.pattern);

        this.state = {
            valid: true,
            idChecker: true
        }
    }

    validate = (e) => {
        //check valid
        if(!this.re.test(e.target.value)) {
            this.setState({
                valid: false
            })
            // e.target.validity.valid = false
        }
        else {
            this.setState({
                valid: true
            })
        }
    }

    render() {
        let pwFlag = false
        let idFlag = true
        let fieldClass = this.state.valid ? "enif-input-field" : "enif-input-field enif-input-invalid"
        return(
            <div className={fieldClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    ref={this.inputRef}
                    type={this.props.type || "text"}
                    // className={this.state.valid ? null : "enif-input-invalid"}
                    id={this.props.name}
                    name={this.props.name}
                    onChange={(e) => {
                        this.validate(e);
                        if(this.props.handleChange) {
                            pwFlag = this.props.handleChange(e);
                        }
                        if(pwFlag) {
                            this.setState({
                                valid: true
                            })
                        }
                    }}
                    onBlur={(e) => {
                        if(e.target.name === "id") {
                            service.duplicateCheck(e.target.value)
                            .then((res) => {
                                console.log("Available ID")
                                this.setState({
                                    idChecker: true
                                })
                            })
                            .catch((res) => {
                                console.log('Existing ID');
                                this.setState({
                                    idChecker: false
                                })
                            })
                        }
                        
                    }}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    pattern={this.props.pattern}
                    disabled={this.props.disabled}
                    maxLength={this.props.maxLength ? this.props.maxLength : 20}
                    required={this.props.required}
                />
                { !this.state.valid && <p>{this.props.invalidMessage}</p> }
                { !this.state.idChecker && <p>{"사용할 수 없는 ID입니다"}</p> }
            </div>
        )
    }
}

export default InputField;

