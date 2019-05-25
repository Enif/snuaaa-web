import React from 'react';
//import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Home, About, Board, Post, Album, Photo, Docu, SignUp, LogIn, MyPage } from './pages';

class Section extends React.Component {

    render() {
        return (
            <section>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route path="/about/:aaa" component={About}/>
                <Route path="/board/:bNo" component={Board}/>
                <Route path="/post/:pNo" component={Post}/>
                {/* <Route path="/photoboard/:pbNo" component={PhotoBoard}/> */}
                <Route path="/album/:aNo" component={Album}/>
                <Route path="/photo/:pNo" component={Photo}/>
                <Route path="/document/:doc_id" component={Docu}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={LogIn}/>
                <Route path="/mypage/:index" component={MyPage}/>
            </section>
        );
    }
}

export default Section;
//export default withRouter(Section);