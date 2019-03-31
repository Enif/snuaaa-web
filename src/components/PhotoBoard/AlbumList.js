import React from 'react';
import { Link } from 'react-router-dom';
import defaultAlbumCover from '../../assets/img/default_photo_img.png'
import defaultStarAlbumCover from '../../assets/img/default_photo_img_star.png'
import Image from '../Common/Image'

const TAG = 'ALBUMLIST'

class AlbumList extends React.Component {

    constructor(props) {
        super(props);
    }

    retrieveAlbums = () => {

        let albumCover = this.props.board_id === 'brd08' ? defaultStarAlbumCover : defaultAlbumCover;
        let albums = this.props.albums;

        let albumList = albums.map(album => {
            let color;
            if(album.category_color) {
                color = {
                    "border-top-color": album.category_color
                }
            }
            
            return (
                <div className="album-list" key={album.object_id} >
                    <Link to={`/album/${album.object_id}`}>

                        <Image imgSrc={album.file_path} defaultImgSrc={albumCover} />
                        <div className="album-cover">
                            <div className="album-category-marker" style={color}>

                            </div>
                            <h5>
                                {album.title}
                            </h5>
                        </div>
                    </Link>
                </div>
            )
        })
        return albumList;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[%s] shouldComponentUpdate', TAG)
        if (this.props.albums.length === nextProps.albums.length) {
            return false;
        }
        return true;
    }

    render() {
        console.log('[%s] render', TAG)
        return (
            <React.Fragment>
                <div className="album-list-wrapper">
                    {this.retrieveAlbums()}
                </div>
            </React.Fragment>
        )
    }
}

export default AlbumList;