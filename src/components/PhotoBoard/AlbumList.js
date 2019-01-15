import React from 'react';
import * as service from '../../services';
import Loading from '../Common/Loading';
import defaultAlbumCover from '../../assets/img/default_photo_img.png'
import defaultStarAlbumCover from '../../assets/img/default_photo_img_star.png'

const TAG = 'ALBUMLIST'

class AlbumList extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG)
        super(props);
        this.albums = [];
        this.state = {
            boardNo: this.props.boardNo,
            isShow: false
        }
        this.retrieveAlbums(this.state.boardNo);
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            boardNo: props.boardNo,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[%s] shouldComponentUpdate', TAG)
        if(this.state.boardNo !== nextState.boardNo){
            nextState.isShow = false;
            this.retrieveAlbums(nextState.boardNo)
            return true;
        }

        if(nextState.isShow === true) {
            return true;
        }
        return false;
    }

    clickAlbum = (albumId, e) => {
        e.preventDefault();
        this.props.setAlbumId(albumId);
        this.props.setBoardState(2);
    }

    retrieveAlbums = async(boardNo) => {
        console.log('[%s] Retrieve Albums', TAG);

        await service.retrieveAlbumsInPhotoBoard(boardNo)
        .then((res) => {
            console.log('[%s] Retrieve Albums Success', TAG);
            console.log(res.data)
            const albumData = res.data;
            let albums = albumData.map(album => {
                return (
                    <div className="album-wrapper" onClick={(e) => this.clickAlbum(album.object_id, e)}>
                        <img src={this.state.boardNo === 'pb01' ? defaultAlbumCover : defaultStarAlbumCover} />
                        {album.title}
                    </div>
                )
            })
            this.albums = albums;
            this.setState({
                isShow: true
            })
        })
        .catch((res) => {
            console.log('[%s] Retrieve Albums Fail', TAG);
        })
    }

    render() {
        console.log('[%s] render', TAG)
        let { isShow } = this.state;
        return (
            <React.Fragment>
            {
                isShow ?
                (
                    <div>
                        <div className="album-list-wrapper">
                            {this.albums}
                        </div>
                    </div>    
                )
                :
                (
                    <Loading/>
                )
            }
                <button className="enif-btn-circle" onClick={() => this.props.togglePopUp()}>+</button>
             
            </React.Fragment>
        ) 
    }

    componentDidMount() {
        console.log('[%s] componentDidMount', TAG)
    }
}

export default AlbumList;