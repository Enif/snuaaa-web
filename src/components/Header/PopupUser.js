import React from 'react';
import { Link } from 'react-router-dom';

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
                <Link to="/mypage/profile"><p>My Page</p></Link>
                <Link to="/mypage/post"><p>Post &amp; Comments</p></Link>
                <p onClick={this.props.logout}>Log out</p>
            </div>
        )
    }
}

export default PopupUser;
