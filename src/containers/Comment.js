import React from 'react';
import * as service from '../services';

import CommentList from '../components/Comment/CommentList';

const TAG = 'COMMENT'

class Comment extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
        this.comments = [];
        this.state = {
            contents: '',
            isReady: false,
            commentInEdit: '',
            editingContents: ''
        }
    }

    componentDidMount() {
        this.retrieveComments(this.props.parent_id)
    }
    
    setCommentInEdit = (comment_id, contents) => {
        this.setState({
            commentInEdit: comment_id,
            editingContents: contents
        })
    }

    retrieveComments = async () => {
        console.log(`[${TAG}] Retrieve Comments`)
        this.setState({
            isReady: false
        })
        await service.retrieveComments(this.props.parent_id)
        .then((res) => {
            console.log(res.data)
            this.comments = res.data;
            this.setState({
                isReady: true
            })
        })
        .catch((err) => {
            console.error(err)
            console.log(`${TAG} Retrieve Comments Fail`);
        })
    }

    createComment = async () => {
        console.log(`[${TAG}] Create Comment`);

        if(!this.state.contents) {
            alert("내용을 입력하세요.")
        }
        else {
            let commentInfo = {
                contents: this.state.contents
            }
    
            await service.createComment(this.props.parent_id, commentInfo)
            .then((res) => {
                console.log('[%s] Create Comment Success', TAG);
                this.setState({
                    contents: ''
                })
                this.retrieveComments();
            })
            .catch((res) => {
                console.log('[%s] Create Comment Fail', TAG);
            })    
        }
    }

    updateComment = async (comment_id) => {
        console.log(`[${TAG}] Update Comment`);
        this.setState({
            isReady: false
        })
        if(!this.state.editingContents) {
            alert("내용을 입력하세요.")
        }
        else {
            let commentInfo = {
                contents: this.state.editingContents
            }
    
            await service.updateComment(comment_id, commentInfo)
            .then((res) => {
                console.log('[%s] Update Comment Success', TAG);
                this.setState({
                    commentInEdit:'',
                    editingContents:''
                })
                this.retrieveComments();
            })
            .catch((res) => {
                console.log('[%s] Update Comment Fail', TAG);
            })    
        }
    }

    deleteComment = async (comment_id) => {
        console.log(`[${TAG}] Delete Comment`);
        let goDrop = window.confirm("정말로 삭제하시겠습니까?");
        if(goDrop) {

            await service.deleteComment(comment_id)
            .then(() => {
                console.log('[%s] Delete Comment Success', TAG);
                alert("삭제 성공");
                this.retrieveComments();
            })
            .catch((res) => {
                console.log('[%s] Update Comment Fail', TAG);
                alert("문제가 발생했습니다. 다시 시도해주세요.");
            })
        }
    }



    handleChange = (e) => {
        this.setState({
            contents: e.target.value
        });
    }
    
    editingContentsChange = (e) => {
        this.setState({
            editingContents: e.target.value
        });
    }
    

    render() {
        return (
            <div className="comment-area-wrapper">
                <CommentList comments={this.comments} deleteComment={this.deleteComment} 
                updateComment={this.updateComment} commentInEdit={this.state.commentInEdit} 
                setCommentInEdit={this.setCommentInEdit} editingContents={this.state.editingContents}
                editingContentsChange={this.editingContentsChange}/>
                <div className="comment-write">
                    <textarea placeholder="댓글을 입력하세요" name="contents" onChange={(e) => this.handleChange(e)} value={this.state.contents}></textarea>
                    <button onClick={this.createComment}>ENTER</button>
                </div>
            </div>            
        )
    }
}

export default Comment;