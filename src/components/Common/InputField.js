import React from 'react';

class InputField extends React.Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
        this.re = new RegExp(this.props.pattern);

        this.state = {
            valid: true
        }
    }

    validate = (e) => {
        //check valid
        console.log(e.target.value);
        console.log(this.re.test(e.target.value))
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
        return(
            <div className="enif-input-field">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    ref={this.inputRef}
                    type={this.props.type || "text"}
                    // className={this.state.valid ? null : "enif-input-invalid"}
                    id={this.props.name}
                    name={this.props.name}
                    onChange={(e) => {
                        this.validate(e)
                        this.props.handleChange(e) }}
                    // onBlur={(e) => this.validate(e)}
                    // value={this.props.value}
                    placeholder={this.props.placeholder}
                    pattern={this.props.pattern}
                    required={this.props.required}
                />
                { !this.state.valid && <p>{this.props.invalidMessage}</p> }
            </div>
        )
    }
}

export default InputField;

