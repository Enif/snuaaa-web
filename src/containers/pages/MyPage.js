import React from 'react';
import { Link } from 'react-router-dom';
import Profile from '../mypage/Profile';
import MyPost from '../mypage/MyPost';

const TAG = 'MYPAGE'

class MyPage extends React.Component {

    constructor(props){
        console.log(`[%s] Constructor`, TAG);
        super(props);

        this.state = {
            index: this.props.match.params.index,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            index: props.match.params.index
        }
    }

    renderComponent() {
        if (this.state.index === 'profile') return (<Profile />);
        else if (this.state.index === 'post') return (<MyPost/>);
        else return <Profile />;
    }

    render() {

        console.log('[%s] render..', TAG);

        return (
            <>
                <div className="userinfo-header">
                    <div className="header-item"><Link to="profile">Profile</Link></div>
                    <div className="header-item"><Link to="post">Post &amp; Comments</Link></div>
                </div>
                {this.renderComponent()}
            </>
        )
    }
}

export default MyPage;