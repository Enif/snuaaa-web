import React from 'react';
import SoundBox from '../../components/Home/SoundBox';
import * as service from '../../services';
import Loading from '../../components/Common/Loading';
import NewPosts from '../../components/Home/NewPosts';
import NewComments from '../../components/Home/NewComments';
import NewPhotos from '../../components/Home/NewPhotos';

const TAG = 'HOME'

class Home extends React.Component {
    
    constructor(props){
        console.log(`[${TAG}] Constructor`)

        super(props)

        this.soundBoxData = undefined;
        this.recentPosts = undefined;
        this.recentComments = undefined;
        this.recentMemory = undefined;
        this.recentAstrophoto = undefined;
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
            service.retrieveSoundBox(),
            service.retrieveRecentPosts(),
            service.retrieveRecentComments(),
            service.retrieveRecentMemory(),
            service.retrieveRecentAstroPhoto()
        ])
        .then((res) => {
            this.soundBoxData = res[0].data;
            this.recentPosts = res[1].data;
            this.recentComments = res[2].data;
            this.recentMemory = res[3].data;
            this.recentAstrophoto = res[4].data;
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
                <div className="section-contents">
                    <div className="home-wrapper">
                        <SoundBox title={this.soundBoxData.title} contents={this.soundBoxData.contents}/>
                        <div className="home-row">
                            <NewPosts posts={this.recentPosts} />
                            <NewComments comments={this.recentComments} />
                        </div>
                        <div className="home-row">
                            <NewPhotos title="New 별사진" photos={this.recentAstrophoto} />
                            <NewPhotos title="New 추억만들기" photos={this.recentMemory} />
                        </div>
                    </div>
                </div>
                :
                <Loading />
        );
    }
}


export default Home;
