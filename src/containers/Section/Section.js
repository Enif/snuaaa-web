import React from 'react';
//import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Home, About, Board, PhotoBoard, Album, SignUp, LogIn, UserInfo } from '../../pages';
import Post from '../../components/Board/Post';

class Section extends React.Component {

    render() {
        return (
            <section className="enif-section-wrapper">
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/board/:bNo" component={Board}/>
                <Route path="/post/:pNo" component={Post}/>
                <Route path="/photoboard/:pbNo" component={PhotoBoard}/>
                <Route path="/album/:aNo" component={Album}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={LogIn}/>
                <Route path="/userinfo" component={UserInfo}/>              
            </section>
        );
    }
}

export default Section;
//export default withRouter(Section);