import React from 'react';
import { Link } from 'react-router-dom';
import ContentStateEnum from 'common/ContentStateEnum';
import { breakLine } from 'utils/breakLine';

const AlbumInfo = ({ albumInfo, my_id, setAlbumState, deleteAlbum }) => {
    let content = albumInfo.content;
    let user = albumInfo.content.user;
    return (
        <div className="album-info">
            <div className="alb-header-wrapper">
                <div className="alb-btn-back">
                    <Link to={`/board/${content.board_id}`}><button>
                        <i className="material-icons">keyboard_backspace</i>
                    </button></Link>
                </div>
                <h5 className="alb-title">{content.title}</h5>
                {
                    (my_id === user.user_id) &&
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
                <p className="alb-author">{user.nickname}</p>
            </div>
            <div>
                <p className="contents">{breakLine(content.text)}</p>
            </div>
        </div>
    )
}

export default AlbumInfo;