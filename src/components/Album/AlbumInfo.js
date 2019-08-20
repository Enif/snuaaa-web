import React from 'react';
import { Link } from 'react-router-dom';
import ContentStateEnum from 'common/ContentStateEnum';
import { breakLine } from 'utils/breakLine';
import ActionDrawer from '../Common/ActionDrawer';

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
                    <ActionDrawer 
                        clickEdit={() => setAlbumState(ContentStateEnum.EDITTING)}
                        clickDelete={deleteAlbum}
                    />
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