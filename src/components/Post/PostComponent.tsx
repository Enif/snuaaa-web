import React from 'react';
import ReactQuill from 'react-quill';

import ProfileMini from '../Common/ProfileMini';
import { convertFullDate } from '../../utils/convertDate';
import DownloadFile from './DownloadFile';
import ActionDrawer from '../Common/ActionDrawer';
import history from '../../common/history';
import FileIcon from '../../components/Common/FileIcon';
import ContentType from '../../types/ContentType';
import FileType from '../../types/FileType';

type PostComponentProps = {
    content: ContentType,
    my_id: number,
    isLiked: boolean,
    files: FileType[],
    likePost: () => void;
    editPost: () => void;
    deletePost: () => void;
}

function PostComponent(
    { content, my_id, isLiked, files,
        likePost, editPost, deletePost }: PostComponentProps
) {

    let user = content.user;

    const makeFileList = () => {
        if (files && files.length > 0) {
            return (
                <div className="file-download-wrapper" >
                    {files.map((file: FileType) => {
                        return (
                            <div className="file-download-list" key={file.file_id} >
                                <DownloadFile key={file.file_id} content_id={file.parent_id} file_id={file.file_id} >
                                    <FileIcon fileInfo={file} isFull={true} />
                                </DownloadFile>
                            </div>
                        )
                    }
                    )}
                </div>
            )
        }
    }

    return (
        <div className="post-wrapper" >
            <div className="post-title" >
                <div className="post-title-back" onClick={() => history.goBack()}>
                    <i className="ri-arrow-left-line enif-pointer" > </i>
                </div>
                < h5 > {content.title} </h5>
                {
                    (my_id === content.author_id) &&
                    <ActionDrawer
                        clickEdit={editPost}
                        clickDelete={deletePost}
                    />
                }
            </div>
            <div className="post-info-other" >
                <div className="post-author" >
                    {user && user.nickname}
                </div>
                <div className="post-date-created enif-flex-center" >
                    <i className="ri-time-line" > </i>
                    {convertFullDate(content.createdAt)}
                    {
                        (content.createdAt !== content.updatedAt) &&
                        <div className="post-date-updated" >
                            {convertFullDate(content.updatedAt)} Updated
                </div>
                    }
                </div>
            </div>
            < div className="post-content" >
                <ReactQuill value={content.text} readOnly={true} theme="bubble" />
            </div>
            {makeFileList()}
            <ProfileMini userInfo={user} />
            <div className="enif-divider" > </div>
            <div className="actions-wrapper" >
                <div className="nums-wrapper" >
                    <div className="view-num-wrapper" >
                        <i className="ri-eye-fill" > </i>
                        {content.view_num}
                    </div>
                    < div className="like-num-wrapper" >
                        <i className={`${isLiked ? 'ri-heart-fill' : 'ri-heart-line'} enif-f-1p5x enif-pointer`} onClick={() => likePost()}>
                        </i>
                        {content.like_num}
                    </div>
                    < div className="comment-num-wrapper" >
                        <i className="ri-message-2-fill enif-f-1p5x" > </i>
                        {content.comment_num}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostComponent;
