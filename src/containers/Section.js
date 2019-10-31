import React from 'react';
import { Route, Switch } from 'react-router-dom';
import history from 'common/history';
import DefaultRoute from 'containers/DefaultRoute';
import { Home, About, Board, Post, Album, Photo, Docu, Exhibition, ExhibitPhoto,
    SignUp, LogIn, MyPage, UserPage, AllPosts, AllComments } from './pages';

const TAG = 'SECTION';

class Section extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`);
        super(props);
    }

    render() {
        let isPhotoModal = false;
        let isExhibitPhotoModal = false;
        let previousLocation = '/';
        console.log(history)

        if ( history.location.state && history.location.state.modal ) {
            previousLocation = history.location.state.backgroundLocation ? history.location.state.backgroundLocation : '/';
            isPhotoModal = true;
        }
        else if (history.location.state && history.location.state.exhibitPhotoModal) {
            previousLocation = history.location.state.backgroundLocation ? history.location.state.backgroundLocation : '/';
            isExhibitPhotoModal = true;
        }
        else if (history.action === "POP" && history.location.pathname.includes('/photo/')) {
            previousLocation = '/'
            isPhotoModal = true;
        }
        else if (history.action === "POP" && history.location.pathname.includes('/exhibitPhoto/')) {
            previousLocation = '/'
            isExhibitPhotoModal = true;
        }

        return (
            <>
                <Switch location={(isPhotoModal || isExhibitPhotoModal) ? previousLocation : history.location}>
                    <DefaultRoute exact path="/" component={Home} />
                    <DefaultRoute exact path="/about" component={About} />
                    <DefaultRoute path="/about/:aaa" component={About} />
                    <DefaultRoute path="/board/:bNo" component={Board} />
                    <DefaultRoute path="/post/:post_id" component={Post} />
                    {/* <Route path="/photoboard/:pbNo" component={PhotoBoard}/> */}
                    <DefaultRoute path="/album/:album_id" component={Album} />
                    {/* <DefaultRoute path="/photo/:photo_id" component={Photo} /> */}
                    <DefaultRoute path="/document/:doc_id" component={Docu} />
                    <DefaultRoute path="/exhibition/:exhibition_id" component={Exhibition} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={LogIn} />
                    <DefaultRoute path="/mypage/:index" component={MyPage} />
                    <DefaultRoute path="/userpage/:uuid" component={UserPage} />
                    <DefaultRoute path="/posts/all" component={AllPosts} />
                    <DefaultRoute path="/comments/all" component={AllComments} />
                    <DefaultRoute component={Home} />
                </Switch>
                {
                    isPhotoModal &&
                    <Route path="/photo/:photo_id" component={Photo} />
                }
                {
                    isExhibitPhotoModal &&
                    <Route path="/exhibitPhoto/:exhibitPhoto_id" component={ExhibitPhoto} />
                }
            </>
        );
    }
}


export default Section;
