import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Home, About, Board, Album, SignUp, LogIn, UserInfo } from '../../pages';

class Section extends React.Component {

    render() {
        return (
            <section>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/board" component={Board}/>
                <Route path="/album" component={Album}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={LogIn}/>
                <Route path="/userinfo" component={UserInfo}/>
            </section>
        );
    }
}

export default withRouter(Section);