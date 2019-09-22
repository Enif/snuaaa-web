import React from 'react';
import EditMyInfo from 'containers/MyPage/EditMyInfo';
import MyInfo from 'containers/MyPage/MyInfo';

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
        if (this.state.index === 'profile') return (<EditMyInfo />);
        else if (this.state.index === 'info') return (<MyInfo/>);
        else return <MyInfo />;
    }

    render() {

        console.log('[%s] render..', TAG);

        return (
            <div className="my-page-wrapper">
                {/* <div className="userinfo-header"> */}
                    {/* <div className="header-item"><Link to="profile">Profile</Link></div>
                    <div className="header-item"><Link to="info">Post &amp; Comments</Link></div> */}
                {/* </div> */}
                {this.renderComponent()}
            </div>
        )
    }
}

export default MyPage;