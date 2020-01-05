import React from 'react';
import ContentStateEnum from 'common/ContentStateEnum';
import Comment from 'containers/Comment.tsx';
import ProfileMini from '../Common/ProfileMini';
import DownloadFile from '../Post/DownloadFile';
import { convertFullDate } from 'utils/convertDate';
import { breakLine } from 'utils/breakLine';
import ActionDrawer from '../Common/ActionDrawer';
import history from 'common/history';
import FileIcon from 'components/Common/FileIcon';

const DocuComponent = ({ docData, my_id, setDocState, deleteDoc, likeDoc, isLiked }) => {

    let contentInfo = docData.content;
    let userInfo = docData.content.user;
    let filesInfo = docData.content.AttachedFiles;

    const makeFileList = () => {
        if (filesInfo && filesInfo.length > 0) {
            return filesInfo.map((file) => {
                return (
                    <div className="file-download-list" key={file.file_id}>
                        <DownloadFile key={file.file_id} content_id={file.parent_id} file_id={file.file_id}>
                            <FileIcon fileInfo={file} isFull={true} />
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
                <div className="post-title-back" onClick={() => history.goBack()}>
                    <i className="ri-arrow-left-line enif-pointer" ></i>
                </div>
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
            <ProfileMini userInfo={userInfo} />
            <div className="enif-divider"></div>
            <div className="nums-wrapper">
                <div className="like-num-wrapper">
                    <i className={`${isLiked ? 'ri-heart-fill' : 'ri-heart-line'} enif-f-1p5x enif-pointer`} onClick={() => likeDoc()}>
                    </i>
                    {contentInfo.like_num}
                </div>
                <div className="comment-num-wrapper">
                    <i className="ri-message-2-fill enif-f-1p5x"></i>
                    {contentInfo.comment_num}
                </div>
            </div>
            <Comment parent_id={contentInfo.content_id} />
        </div>
    )
}

export default DocuComponent;
