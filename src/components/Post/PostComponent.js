import React from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import ContentStateEnum from 'common/ContentStateEnum';
import Comment from 'containers/Comment';
import ProfileMini from '../Common/ProfileMini';
import { convertFullDate } from 'utils/convertDate';
import DownloadFile from './DownloadFile';
import ActionDrawer from '../Common/ActionDrawer';
// import { breakLine } from 'utils/breakLine';

const PostComponent = ({ postData, my_id, likeInfo, fileInfo, likePost, setPostState, deletePost }) => {

    let content = postData.content;
    let user = postData.content.user;

    const makeFileList = () => {
        if (fileInfo && fileInfo.length > 0) {
            const fileList = fileInfo.map((file) => {
                let fileTypeClass = '';

                file.file_type === 'IMG' ? fileTypeClass = 'fa-file-image color-img'
                    : file.file_type === 'DOC' ? fileTypeClass = 'fa-file-word color-doc'
                        : file.file_type === 'XLS' ? fileTypeClass = 'fa-file-excel color-xls'
                            : file.file_type === 'PDF' ? fileTypeClass = 'fa-file-pdf color-pdf'
                                : file.file_type === 'ZIP' ? fileTypeClass = 'fa-file-archive color-zip'
                                    : fileTypeClass = 'fa-file-alt'

                return (
                    <div className="file-download-list" key={file.file_id}>
                        <DownloadFile key={file.file_id} content_id={file.parent_id} file_id={file.file_id}>
                            <i className={`fas ${fileTypeClass} font-20 file-icon`}>
                            </i>
                            <div className="file-download-name">{file.original_name}</div>
                        </DownloadFile>
                    </div>
                )
            })
            return (
                <div className="file-download-wrapper">
                    {fileList}
                </div>
            )
        }
        else {
            return;
        }
    }

    return (
        <div className="post-wrapper">
            <div className="post-title">
                <Link to={`/board/${content.board_id}`}>
                    <i className="material-icons">keyboard_backspace</i>
                </Link>
                <h5>{content.title}</h5>
                {
                    (my_id === content.author_id) &&
                    <ActionDrawer
                        clickEdit={() => setPostState(ContentStateEnum.EDITTING)}
                        clickDelete={deletePost} />
                }
            </div>
            <div className="post-info-other">
                <div className="post-author">
                    {user.nickname}
                </div>
                <div className="post-date">
                    {convertFullDate(content.createdAt)}
                </div>
            </div>
            <div className="post-content">
                <ReactQuill value={content.text} readOnly={true} theme="bubble" />
                {/* {breakLine(content.text)} */}
            </div>
            {makeFileList()}
            <ProfileMini profileImg={user.profile_path} nickname={user.nickname} userDesc={user.introduction} />
            <div className="enif-divider"></div>
            <div className="actions-wrapper">
                {/* {
                    (my_id === content.author_id) &&
                    <div className="edit-delete-wrapper">
                        <div className="edit-wrapper">
                            <i className="material-icons pointer" onClick={() => setPostState(ContentStateEnum.EDITTING)}>edit</i>
                        </div>
                        <div className="delete-wrapper">
                            <i className="material-icons pointer" onClick={() => deletePost()}>delete</i>
                        </div>
                    </div>
                } */}

                <div className="nums-wrapper">
                    <div className="view-num-wrapper">
                        <i className="material-icons pointer">visibility</i>
                        {content.view_num}
                    </div>
                    <div className="like-num-wrapper">
                        <i className="material-icons pointer" onClick={() => likePost()}>
                            {likeInfo ? 'favorite' : 'favorite_border'}
                        </i>
                        {content.like_num}
                    </div>
                    <div className="comment-num-wrapper">
                        <i className="material-icons">comment</i>
                        {content.comment_num}
                    </div>
                </div>
            </div>
            <Comment parent_id={content.content_id} />
        </div>
    )
}

export default PostComponent;