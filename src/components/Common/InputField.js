import React from 'react';

const InputField = ({ label, name, type, value, valid,
    placeholder, pattern, disabled, maxLength, required,
    invalidMessage, handleChange, handleBlur }) => {

    // this.inputRef = React.createRef();
    let fieldClass;
    if (valid === true) {
        fieldClass = "enif-input-field enif-input-valid";
    }
    else if (valid === false) {
        fieldClass = "enif-input-field enif-input-invalid";
    }
    else {
        fieldClass = "enif-input-field";
    }

    return (
        <div className={fieldClass}>
            <label htmlFor={name}>{label}</label>
            <input
                // ref={this.inputRef}
                type={type || "text"}
                id={name}
                name={name}
                onChange={(e) => {
                    handleChange(e)
                }}
                onBlur={(e) => {
                    if (handleBlur) {
                        handleBlur(e);
                    }
                }}
                value={value}
                placeholder={placeholder}
                pattern={pattern}
                disabled={disabled}
                maxLength={maxLength ? maxLength : 20}
                required={required}
            />
            {valid === false && <p>{invalidMessage}</p>}
        </div>
    )

}

export default InputField;

