import React from 'react';

const TAG = 'PopupUser';

class PopupUser extends React.Component {

    constructor(props) {
        console.log(`[%s] constructor`, TAG)
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="popup-user-wrapper">
                <div className="btn-toggle" onClick={this.props.togglePopup}>x</div>
                <p>My page</p>
                <p>Posts</p>
                <p>Comments</p>
                <p onClick={this.props.logout}>Log out</p>
            </div>
        )
    }
}

export default PopupUser;
