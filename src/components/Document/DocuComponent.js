import React from 'react';
import ContentStateEnum from 'common/ContentStateEnum';
import Comment from 'containers/Comment';
import ProfileMini from '../Common/ProfileMini';
import DownloadFile from '../Post/DownloadFile';
import { convertFullDate } from 'utils/convertDate';
import { breakLine } from 'utils/breakLine';
import ActionDrawer from '../Common/ActionDrawer';
import history from 'common/history';

const DocuComponent = ({ docData, my_id, setDocState, deleteDoc, likeDoc, isLiked }) => {

    let contentInfo = docData.content;
    let userInfo = docData.content.user;
    let filesInfo = docData.content.AttachedFiles;

    const makeFileList = () => {
        if (filesInfo && filesInfo.length > 0) {
            return filesInfo.map((file) => {
                let fileTypeClass = '';

                file.file_type === 'IMG' ? fileTypeClass = 'fa-file-image color-img'
                    : file.file_type === 'DOC' ? fileTypeClass = 'fa-file-word color-doc'
                        : file.file_type === 'XLS' ? fileTypeClass = 'fa-file-excel color-xls'
                            : file.file_type === 'PDF' ? fileTypeClass = 'fa-file-pdf color-pdf'
                                : file.file_type === 'ZIP' ? fileTypeClass = 'fa-file-archive color-zip'
                                    : file.file_type === 'HWP' ? fileTypeClass = 'custom-hwp'
                                        : fileTypeClass = 'fa-file-alt'

                return (
                    <div className="file-download-list" key={file.file_id}>
                        <DownloadFile key={file.file_id} content_id={file.parent_id} file_id={file.file_id}>
                            <i className={`fas ${fileTypeClass} font-20 file-icon`}>
                            </i>
                            <div className="file-download-name">{file.original_name}</div>
                            &nbsp;
                            <i className="material-icons">save_alt</i>
                            {file.download_count}
                        </DownloadFile>
                    </div>
                )
            })
        }
        else {
            return;
        }
    }

    return (
        <div className="post-wrapper">
            <div className="post-title">
                <i className="material-icons pointer post-title-back" onClick={() => history.goBack()} > keyboard_backspace</i>
                <h5>{contentInfo.title}</h5>
                {
                    (my_id === userInfo.user_id) &&
                    <ActionDrawer
                        clickEdit={() => setDocState(ContentStateEnum.EDITTING)}
                        clickDelete={deleteDoc} />
                }
            </div>
            <div className="post-info-other">
                <div className="post-author">
                    {userInfo.nickname}
                </div>
                <div className="post-date">
                    {convertFullDate(contentInfo.createdAt)}
                </div>
            </div>
            <div className="post-content">
                {breakLine(contentInfo.text)}
            </div>
            <div className="file-download-wrapper">
                {makeFileList()}
            </div>
            <ProfileMini profileImg={userInfo.profile_path} nickname={userInfo.nickname} userDesc={userInfo.introduction} />
            <div className="enif-divider"></div>
            <div className="nums-wrapper">
                <div className="like-num-wrapper">
                    <i className="material-icons pointer" onClick={() => likeDoc()}>
                        {isLiked ? 'favorite' : 'favorite_border'}
                    </i>
                    {contentInfo.like_num}
                </div>
                <div className="comment-num-wrapper">
                    <i className="material-icons">comment</i>
                    {contentInfo.comment_num}
                </div>
            </div>
            <Comment parent_id={contentInfo.content_id} />
        </div>
    )
}

export default DocuComponent;
