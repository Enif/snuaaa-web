import React from 'react';
import defaultAlbumCover from '../../assets/img/default_photo_img.png'
import defaultStarAlbumCover from '../../assets/img/default_photo_img_star.png'
import Image from '../Common/Image'

const TAG = 'ALBUMLIST'

class AlbumList extends React.Component {

    constructor(props) {
        super(props);
    }

    retrieveAlbums = () => {

        let albumCover = this.props.boardNo === 'pb02' ? defaultStarAlbumCover : defaultAlbumCover;
        let albums = this.props.albums;
        let albumList = albums.map(album => {
            return (
                <div className="album-list" onClick={(e) => this.props.redirectAlbum(album.object_id)}>
                    <Image imgSrc={album.file_path} defaultImgSrc={albumCover} />
                    <div className="album-cover">
                        <h5>
                            {album.title}
                        </h5>
                    </div>
                </div>
            )
        })
        return albumList;
    }

    render() {
        console.log('[%s] render', TAG)
        return (
            <React.Fragment>
                <div className="album-list-wrapper">
                    {this.retrieveAlbums()}
                </div>
                <button className="enif-btn-circle" onClick={() => this.props.togglePopUp()}>+</button>
            </React.Fragment>
        ) 
    }
}

export default AlbumList;