import React, { useState, useEffect } from 'react';
import SoundBox from '../../components/Home/SoundBox';
import Loading from '../../components/Common/Loading';
import NewPosts from '../../components/Home/NewPosts';
import NewComments from '../../components/Home/NewComments';
import NewPhotos from '../../components/Home/NewPhotos';
import NewExhibitions from '../../components/Home/NewExhibitions';
import RiseSetMobile from '../../components/Home/RiseSetMobile';
import ExtLinkMobile from '../../components/Home/ExtLinkMobile';
import BoardService from '../../services/BoardService';
import HomeService from '../../services/HomeService';
import ContentType from '../../types/ContentType';
import CommentType from '../../types/CommentType';
import NewAlbums from '../../components/Home/NewAlbums';
import AlbumType from '../../types/AlbumType';
import PhotoType from '../../types/PhotoType';

const TAG = 'HOME'

type HomeInfo = {
    soundBoxData?: any;
    recentPosts?: ContentType[];
    recentComments?: CommentType[];
    recentMemory?: AlbumType[];
    recentAstrophoto?: PhotoType[];
    recentExhibitions?: ContentType[]

}

function Home() {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [homeData, setHomeData] = useState<HomeInfo>({})

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setIsReady(false);

        await Promise.all([
            HomeService.retrieveSoundBox(),
            HomeService.retrieveRecentPosts(),
            HomeService.retrieveRecentComments(),
            HomeService.retrieveRecentMemory(),
            HomeService.retrieveRecentAstroPhoto(),
            BoardService.retrieveExhibitionsInBoard('brd'),
            // HomeService.retrieveRiseSet()
        ])
            .then((res) => {
                setHomeData({
                    soundBoxData: res[0].data,
                    recentPosts: res[1].data,
                    recentComments: res[2].data,
                    recentMemory: res[3].data,
                    recentAstrophoto: res[4].data,
                    recentExhibitions: res[5].data
                })
                // this.riseSetInfo = res[6].data;
                setIsReady(true);
            })
            .catch((err) => {
                console.error(err)
            })
    }

    // console.log(isReady && soundBoxData && recentPosts && recentComments && recentAstrophoto && recentMemory && recentExhibitions)

    return (
        isReady ?
            <div className="home-wrapper">
                {
                    homeData.soundBoxData &&
                    <SoundBox soundBoxInfo={homeData.soundBoxData} />
                }
                <div className="home-row-mobile">
                    <RiseSetMobile />
                    <ExtLinkMobile />
                </div>
                <div className="home-row">
                    {
                        homeData.recentPosts &&
                        <NewPosts posts={homeData.recentPosts} />
                    }
                    {
                        homeData.recentComments &&
                        <NewComments comments={homeData.recentComments} />
                    }
                </div>
                <div className="home-row">
                    {
                        homeData.recentAstrophoto &&
                        <NewPhotos title="New 별사진" board_id="brd32" photos={homeData.recentAstrophoto} />
                    }
                    {
                        homeData.recentMemory &&
                        <NewAlbums title="New 추억만들기" board_id="brd31" albums={homeData.recentMemory} />
                    }
                </div>
                <div className="home-row">
                    {
                        homeData.recentExhibitions &&
                        <NewExhibitions board_id="brd41" exhibitions={homeData.recentExhibitions} />
                    }
                </div>
            </div>
            :
            <Loading />
    );
}

export default Home;
