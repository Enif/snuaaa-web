import React, { lazy, Suspense, useState, useEffect, useContext } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
// import history from '../common/history';
import DefaultRoute from '../containers/DefaultRoute';
import { Location } from 'history';

// Don't load lazy. scroll is reset when initial loading.
import Photo from '../components/Photo/Photo';
import ExhibitPhoto from '../components/ExhibitPhoto/ExhibitPhoto';
import BoardType from '../types/BoardType';
import BoardService from '../services/BoardService';
import BoardContext from '../contexts/BoardContext';
import RiseSetContext from '../contexts/RiseSetContext';
import AuthContext from '../contexts/AuthContext';
import RiseSetType from '../types/RiseSetType';
import HomeService from '../services/HomeService';

const Home = lazy(() => import('../components/Home/Home'));
const About = lazy(() => import('../components/About/About'));
const Board = lazy(() => import('../components/Board/Board'));
const Post = lazy(() => import('../components/Post/Post'));
const Album = lazy(() => import('../components/Album/Album'));
// const Photo = lazy(() => import('./pages/Photo'));
const Docu = lazy(() => import('../components/Document/Document'));
const Exhibition = lazy(() => import('../components/Exhibition/Exhibition'));
// const ExhibitPhoto = lazy(() => import('./pages/ExhibitPhoto'));
const SignUp = lazy(() => import('../components/Signup/SignUp'));
const LogIn = lazy(() => import('../components/Login/LogIn'));
const MyPage = lazy(() => import('../components/MyPage/MyPage'));
const UserPage = lazy(() => import('../components/UserPage/UserPage'));
const AllPosts = lazy(() => import('../components/AllPosts/AllPosts'));
const AllComments = lazy(() => import('../components/AllComments/AllComments'));
const MightyCalculator = lazy(() => import('../components/MightyCalculator/MightyCalculator'));
const MgtUser = lazy(() => import('../components/MgtUser/MgtUser'));

const defaultRiseSet: RiseSetType = {
    aste: 0,
    astm: 0,
    lunAge: 0,
    moonrise: 0,
    moonset: 0,
    sunrise: 0,
    sunset: 0
};

function Section() {
    let isPhotoModal = false;
    let isExhibitPhotoModal = false;
    let previousLocation: Location = { pathname: '/', search: '', key: '', hash: '', state: '' };
    let history = useHistory();
    let location = useLocation();
    const [boardsInfo, setBoardsInfo] = useState<BoardType[]>([])
    const [riseSetInfo, setRiseSetInfo] = useState<RiseSetType>(defaultRiseSet);
    const authContext = useContext(AuthContext);

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
        if (authContext.authInfo.isLoggedIn) {
            fetch();
        }
    }, [authContext.authInfo])

    const fetch = async () => {
        try {
            let boardRes = await BoardService.retrieveBoards();
            setBoardsInfo(boardRes.data);
            let riseSetRes = await HomeService.retrieveRiseSet();
            setRiseSetInfo(riseSetRes.data);
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <BoardContext.Provider value={{ boardsInfo: boardsInfo, setBoardsInfo: setBoardsInfo }}>
                <RiseSetContext.Provider value={riseSetInfo}>
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
                            <DefaultRoute path="/mightyCalculator" component={MightyCalculator} />
                            <DefaultRoute paht="/mgt/user" component={MgtUser} />
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
                </RiseSetContext.Provider>
            </BoardContext.Provider>
        </>
    );
}

export default Section;
