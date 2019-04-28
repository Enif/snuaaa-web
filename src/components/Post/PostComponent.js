import React from 'react';
// import { EditorState, ContentState } from 'draft-js';
// import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import Comment from '../../containers/Comment';
import ProfileMini from '../Common/ProfileMini';
import { convertFullDate } from '../../utils/convertDate';
// import { breakLine } from '../../utils/breakLine';

const PostComponent = ({postData, editorState , post_id, likeInfo, likePost, setisEditting}) => {

    // const blocksFromHtml = htmlToDraft(postData.contents);
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    // const editorState = EditorState.createWithContent(contentState);

    return (

        <div className="post-wrapper">
            <div className="post-title">
                <h5>{postData.title}</h5>
            </div>
            <div className="post-info-other">
                <div className="post-author">
                    {postData.nickname}
                </div>
                <div className="post-date">
                    {convertFullDate(postData.created_at)}
                </div>
            </div>
            <div className="post-content">
                <Editor toolbarHidden editorState={editorState} />
            </div>
            <ProfileMini profileImg={postData.profile_path} nickname={postData.nickname} userDesc={postData.introduction}/>
            <div className="enif-divider"></div>
            <div className="actions-wrapper">
                <div className="edit-delete-wrapper">
                    <div className="edit-wrapper">
                        <i className="material-icons pointer" onClick={() => setisEditting(true)}>edit</i>
                    </div>
                    <div className="delete-wrapper">
                        <i className="material-icons pointer">delete</i>
                    </div>
                </div>
                <div className="like-comment-num-wrapper">
                    <div className="like-num-wrapper">
                        <i className="material-icons pointer" onClick={() => likePost()}>
                            { likeInfo ? 'favorite' : 'favorite_border'}
                        </i>
                        {postData.like_num}                  
                    </div>
                    <div className="comment-num-wrapper">
                        <i className="material-icons">comment</i>
                        {postData.comment_num}
                    </div>
                </div>
            </div>
            <Comment parent_id={post_id}/>
        </div>
    )
}

export default PostComponent;