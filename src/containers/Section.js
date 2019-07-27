import React from 'react';
import { Route } from 'react-router-dom';
import DefaultRoute from 'containers/DefaultRoute';
import { Home, About, Board, Post, Album, Photo, Docu, SignUp, LogIn, MyPage } from './pages';

class Section extends React.Component {

    render() {
        return (
            <>
                <DefaultRoute exact path="/" component={Home} />
                <DefaultRoute exact path="/about" component={About} />
                <DefaultRoute path="/about/:aaa" component={About} />
                <DefaultRoute path="/board/:bNo" component={Board} />
                <DefaultRoute path="/post/:pNo" component={Post} />
                {/* <Route path="/photoboard/:pbNo" component={PhotoBoard}/> */}
                <DefaultRoute path="/album/:aNo" component={Album} />
                <DefaultRoute path="/photo/:pNo" component={Photo} />
                <DefaultRoute path="/document/:doc_id" component={Docu} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={LogIn} />
                <DefaultRoute path="/mypage/:index" component={MyPage} />
            </>
        );
    }
}

export default Section;
