import React from 'react';
import { Link } from 'react-router-dom';
import defaultAlbumCover from 'assets/img/default_photo_img.png'
import defaultStarAlbumCover from 'assets/img/default_photo_img_star.png'
import Image from '../Common/Image'

const TAG = 'ALBUMLIST'

class AlbumList extends React.Component {

    retrieveAlbums = () => {

        // let boardInfo = 
        let albumCover = this.props.board_id === 'brd32' ? defaultStarAlbumCover : defaultAlbumCover;
        let albums = this.props.albums;

        let albumList = albums.map(album => {
            let contentInfo = album.content;
            let categoryInfo = album.content.category;
            // let thumbnailInfo = album.thumbnail && album.thumbnail.photo
            let thumbnailPath = '';
            if (album.thumbnail) {
                thumbnailPath = album.thumbnail.thumbnail_path;
            }
            else if (album.content.albumPhoto && album.content.albumPhoto[0]){
                thumbnailPath = album.content.albumPhoto[0].thumbnail_path;
            }
            else {
                thumbnailPath = '';
            }
            let color;
            if (categoryInfo && categoryInfo.category_color) {
                color = {
                    "borderTopColor": categoryInfo.category_color
                }
            }

            return (
                <div className="album-list" key={album.content_id} >
                    <Link to={`/album/${album.content_id}`}>
                        <Image imgSrc={thumbnailPath} defaultImgSrc={albumCover} />
                        <div className="album-cover">
                            <div className="album-category-marker" style={color}>

                            </div>
                            <h5>
                                {contentInfo.title}
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
            <div className="album-list-wrapper">
                {this.retrieveAlbums()}
            </div>
        )
    }
}

export default AlbumList;
