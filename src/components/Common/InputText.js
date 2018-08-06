import React from 'react';

class InputText extends React.Component {


    constructor(props){
        super(props);        
    }

    render() {
        return (
            <input type="text"
                name={this.props.name}
                className={this.props.className}
                onChange={this.props.handleChange}
                value={this.props.value}
             />
        )
    }
}

export default InputText;


