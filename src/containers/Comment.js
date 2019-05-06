import React from 'react';
import { connect } from 'react-redux';
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
        this.setState({
            isReady: false
        })
        await service.retrieveComments(this.props.parent_id)
        .then((res) => {
            this.comments = res.data;
            this.setState({
                isReady: true
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    createComment = async () => {

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
            .catch((err) => {
                console.error(err);
                alert("댓글 작성 실패");
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
            .catch((err) => {
                console.error(err);
                alert("댓글 업데이트 실패");
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
            .catch((err) => {
                console.error(err);
                alert("댓글 삭제 실패");
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
        console.log(`[${TAG}] render..`);
        const { my_id } = this.props;

        return (
            <div className="comment-area-wrapper">
                <CommentList my_id={my_id} comments={this.comments} deleteComment={this.deleteComment} 
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

const mapStateToProps = (state) => {
    return {
        my_id: state.authentication.user_id
    }
}

export default connect(mapStateToProps, null)(Comment);