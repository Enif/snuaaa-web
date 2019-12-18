import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import history from 'common/history';
import DefaultRoute from 'containers/DefaultRoute';

import Photo from './pages/Photo'; // Don't load lazy. scroll is reset when initial loading.

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Board = lazy(() => import('./pages/Board'));
const Post = lazy(() => import('./pages/Post'));
const Album = lazy(() => import('./pages/Album'));
// const Photo = lazy(() => import('./pages/Photo'));
const Docu = lazy(() => import('./pages/Document'));
const Exhibition = lazy(() => import('./pages/Exhibition'));
const ExhibitPhoto = lazy(() => import('./pages/ExhibitPhoto'));
const SignUp = lazy(() => import('./pages/SignUp'));
const LogIn = lazy(() => import('./pages/LogIn'));
const MyPage = lazy(() => import('./pages/MyPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const AllPosts = lazy(() => import('./pages/AllPosts'));
const AllComments = lazy(() => import('./pages/AllComments'));

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

        if (history.location.state && history.location.state.modal) {
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
                <Suspense fallback={<div>Loading pages...</div>}>
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
                </Suspense>
            </>
        );
    }
}


export default Section;
