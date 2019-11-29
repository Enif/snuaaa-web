import React from 'react';
import SoundBox from 'components/Home/SoundBox';
import Loading from 'components/Common/Loading';
import NewPosts from 'components/Home/NewPosts';
import NewComments from 'components/Home/NewComments';
import NewPhotos from 'components/Home/NewPhotos';
import NewExhibitions from 'components/Home/NewExhibitions';
import RiseSetMobile from '../../components/Home/RiseSetMobile';
import ExtLinkMobile from '../../components/Home/ExtLinkMobile';
import BoardService from 'services/BoardService';
import HomeService from 'services/HomeService';

const TAG = 'HOME'

class Home extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)

        super(props)

        this.soundBoxData = undefined;
        this.recentPosts = undefined;
        this.recentComments = undefined;
        this.recentMemory = undefined;
        this.recentAstrophoto = undefined;
        this.recentExhibitions = undefined;
        this.riseSetInfo = undefined;
        this.state = {
            isReady: false
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        this.setState({
            isReady: false
        })
        await Promise.all([
            HomeService.retrieveSoundBox(),
            HomeService.retrieveRecentPosts(),
            HomeService.retrieveRecentComments(),
            HomeService.retrieveRecentMemory(),
            HomeService.retrieveRecentAstroPhoto(),
            BoardService.retrieveExhibitionsInBoard(),
            HomeService.retrieveRiseSet()
        ])
            .then((res) => {
                this.soundBoxData = res[0].data;
                this.recentPosts = res[1].data;
                this.recentComments = res[2].data;
                this.recentMemory = res[3].data;
                this.recentAstrophoto = res[4].data;
                this.recentExhibitions = res[5].data;
                this.riseSetInfo = res[6].data;
                this.setState({
                    isReady: true
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    render() {

        const { isReady } = this.state;

        return (
            isReady ?
                <div className="home-wrapper">
                    <SoundBox soundBoxInfo={this.soundBoxData} />
                    <div className="home-row-mobile">
                        <RiseSetMobile riseSetInfo={this.riseSetInfo} />
                        <ExtLinkMobile />
                    </div>
                    <div className="home-row">
                        <NewPosts posts={this.recentPosts} />
                        <NewComments comments={this.recentComments} />
                    </div>
                    <div className="home-row">
                        <NewPhotos title="New 별사진" board_id="brd32" photos={this.recentAstrophoto} />
                        <NewPhotos title="New 추억만들기" board_id="brd31" photos={this.recentMemory} />
                    </div>
                    <div className="home-row">
                        <NewExhibitions board_id="brd41" exhibitions={this.recentExhibitions} />
                    </div>
                </div>
                :
                <Loading />
        );
    }
}


export default Home;
