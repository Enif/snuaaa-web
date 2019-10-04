import React from 'react';
import { Route, Switch } from 'react-router-dom';
import history from 'common/history';
import DefaultRoute from 'containers/DefaultRoute';
import { Home, About, Board, Post, Album, Photo, Docu, SignUp, LogIn, MyPage, UserPage } from './pages';
import AllPosts from './AllPosts/AllPosts';

const TAG = 'SECTION';

class Section extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`);
        super(props);
        this.previousLocation = history.location;
    }


    shouldComponentUpdate(nextProps, nextState) {
        // let location = this.previousLocation;
        if (history.action === "REPLACE") {

        }
        else if (
            history.action !== "POP" &&
            (!history.location.state || !history.location.state.modal)
        ) {
            this.previousLocation = history.location;
        }
        return true;
    }

    render() {
        // const { isPhotoModal } = this.props;
        // let isPhotoModal = true;
        let isPhotoModal = false;
        if (
            history.location.state &&
            history.location.state.modal &&
            this.previousLocation !== history.location
        ) {
            isPhotoModal = true;
        }
        if (history.action === "POP" && history.location.pathname.includes('/photo/')) {
            isPhotoModal = true;
        };

        return (
            <>
                <Switch location={isPhotoModal ? this.previousLocation : history.location}>
                    <DefaultRoute exact path="/" component={Home} />
                    <DefaultRoute exact path="/about" component={About} />
                    <DefaultRoute path="/about/:aaa" component={About} />
                    <DefaultRoute path="/board/:bNo" component={Board} />
                    <DefaultRoute path="/post/:post_id" component={Post} />
                    {/* <Route path="/photoboard/:pbNo" component={PhotoBoard}/> */}
                    <DefaultRoute path="/album/:album_id" component={Album} />
                    {/* <DefaultRoute path="/photo/:photo_id" component={Photo} /> */}
                    <DefaultRoute path="/document/:doc_id" component={Docu} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={LogIn} />
                    <DefaultRoute path="/mypage/:index" component={MyPage} />
                    <DefaultRoute path="/userpage/:uuid" component={UserPage} />
                    <DefaultRoute path="/posts/all" component={AllPosts} />
                    <DefaultRoute component={Home} />
                </Switch>
                {
                    isPhotoModal &&
                    <Route path="/photo/:photo_id" component={Photo} />
                }
            </>
        );
    }
}


export default Section;
