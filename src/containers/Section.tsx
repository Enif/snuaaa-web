import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
// import history from '../common/history';
import DefaultRoute from '../containers/DefaultRoute';
import { Location } from 'history';

// Don't load lazy. scroll is reset when initial loading.
import Photo from './pages/Photo';
import ExhibitPhoto from './pages/ExhibitPhoto';
import BoardType from '../types/BoardType';
import BoardService from '../services/BoardService';
import BoardContext from '../contexts/BoardContext';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Board = lazy(() => import('./pages/Board'));
const Post = lazy(() => import('./pages/Post'));
const Album = lazy(() => import('./pages/Album'));
// const Photo = lazy(() => import('./pages/Photo'));
const Docu = lazy(() => import('./pages/Document'));
const Exhibition = lazy(() => import('./pages/Exhibition'));
// const ExhibitPhoto = lazy(() => import('./pages/ExhibitPhoto'));
const SignUp = lazy(() => import('./pages/SignUp'));
const LogIn = lazy(() => import('./pages/LogIn'));
const MyPage = lazy(() => import('./pages/MyPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const AllPosts = lazy(() => import('./pages/AllPosts'));
const AllComments = lazy(() => import('./pages/AllComments'));


function Section() {
    let isPhotoModal = false;
    let isExhibitPhotoModal = false;
    let previousLocation: Location = { pathname: '/', search: '', key: '', hash: '', state: '' };
    let history = useHistory();
    let location = useLocation();
    const [boardInfo, setBoardInfo] = useState<BoardType[]>([])

    if (location.state && location.state.modal) {
        previousLocation = location.state.backgroundLocation ? location.state.backgroundLocation : '/';
        isPhotoModal = true;
    }
    else if (location.state && location.state.exhibitPhotoModal) {
        previousLocation = location.state.backgroundLocation ? location.state.backgroundLocation : '/';
        isExhibitPhotoModal = true;
    }
    else if (history.action === "POP" && location.pathname.includes('/photo/')) {
        previousLocation = { pathname: '/', search: '', key: '', hash: '', state: '' }
        isPhotoModal = true;
    }
    else if (history.action === "POP" && location.pathname.includes('/exhibitPhoto/')) {
        previousLocation = { pathname: '/', search: '', key: '', hash: '', state: '' }
        isExhibitPhotoModal = true;
    }

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            let res = await BoardService.retrieveBoards();
            setBoardInfo(res.data);
            console.log(res)
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <BoardContext.Provider value={boardInfo}>
                <Suspense fallback={<div>Loading pages...</div>}>
                    <Switch location={(isPhotoModal || isExhibitPhotoModal) ? previousLocation : history.location}>
                        <DefaultRoute exact path="/" component={Home} />
                        <DefaultRoute exact path="/about" component={About} />
                        <DefaultRoute path="/about/:aaa" component={About} />
                        <DefaultRoute path="/board/:board_id" component={Board} />
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
            </BoardContext.Provider>
        </>
    );
}

export default Section;
