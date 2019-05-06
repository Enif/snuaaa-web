import React from 'react';
import Image from '../Common/Image';
import { breakLine } from '../../utils/breakLine';
import defaultProfile from '../../assets/img/profile.png';

const TAG = 'COMMENTLIST'

class CommentList extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
    }

    retrieveComments = () => {
        let comments = this.props.comments
        let commentList = comments.map(comment => {
            return (
                <div key={comment.comment_id} className="comment-wrapper">
                    <div className="profile">
                        <Image imgSrc={comment.profile_path} defaultImgSrc={defaultProfile} />
                    </div>
                    <div className="com-cont-wrp">
                        <h5>{comment.nickname}</h5>
                        {
                            comment.comment_id === this.props.commentInEdit ?
                            <>
                                <textarea value={this.props.editingContents} onChange={(e)=> this.props.editingContentsChange(e)}>
                                </textarea>
                                <button onClick={(e) => this.props.updateComment(comment.comment_id)}>ENTER</button>
                            </>
                            :
                            <p>
                                {breakLine(comment.contents)}
                            </p>
                        }
                    </div>
                    {
                        this.props.my_id === comment.author_id &&
                        <div className="actions-wrapper">
                            <div className="edit-wrapper">
                                <i className="material-icons pointer" onClick={() => this.props.setCommentInEdit(comment.comment_id, comment.contents)}>edit</i>
                            </div>
                            <div className="delete-wrapper">
                                <i className="material-icons pointer" onClick={() => this.props.deleteComment(comment.comment_id)}>delete</i>
                            </div>
                        </div>
                    }
                </div>
            )
        })
        return commentList
    }

    render(){

        return (
            <div className="comment-list-wrapper">
                {this.retrieveComments()}
            </div>            
        )
    }
}

export default CommentList;