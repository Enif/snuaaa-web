import React from 'react';

const InputText = ({inputType, name, className, handleChange, value, placeholder, pattern, isRequired }) => {
    return (
        <input
            type={inputType}
            name={name}
            className={className}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            pattern={pattern}
            required={isRequired}
        />
    )
}

export default InputText;


