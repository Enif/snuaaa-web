import React from 'react';
import { Link } from 'react-router-dom';
import ContentStateEnum from 'common/ContentStateEnum';
import { breakLine } from 'utils/breakLine';

const AlbumInfo = ({ albumInfo, my_id, setAlbumState, deleteAlbum }) => {
    return (
        <div className="album-info">
            <div className="alb-header-wrapper">
                <div className="alb-btn-back">
                    <Link to={`/board/${albumInfo.board_id}`}><button>
                        <i className="material-icons">keyboard_backspace</i>
                    </button></Link>
                </div>
                <h5 className="alb-title">{albumInfo.title}</h5>
                {
                    (my_id === albumInfo.author_id) &&
                    <div className="actions-wrapper">
                        <div className="edit-delete-wrapper">
                            <div className="edit-wrapper">
                                <i className="material-icons pointer" onClick={() => setAlbumState(ContentStateEnum.EDITTING)}>edit</i>
                            </div>
                            <div className="delete-wrapper">
                                <i className="material-icons pointer" onClick={deleteAlbum}>delete</i>
                            </div>
                        </div>
                    </div>
                }
                <p className="alb-author">{albumInfo.nickname}</p>
            </div>
            <div>
                <p className="contents">{breakLine(albumInfo.contents)}</p>
            </div>
        </div>
    )
}

export default AlbumInfo;