import React from 'react';
import { connect } from 'react-redux';
import * as service from '../services';
import CommentList from '../components/Comment/CommentList';

const TAG = 'COMMENT'

class Comment extends React.Component {

    constructor(props) {
        super(props);
        console.log('[%s] constructor', TAG);

        this.state = {
            comments: [],
            text: '',
            isReady: false,
            commentInEdit: '',
            editingContents: ''
        }
    }

    componentDidMount() {
        this.retrieveComments(this.props.parent_id)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.parent_id !== nextProps.parent_id) {
            this.retrieveComments(nextProps.parent_id);
        }
        return true;
    }
    
    setCommentInEdit = (comment_id, text) => {
        this.setState({
            commentInEdit: comment_id,
            editingContents: text
        })
    }

    retrieveComments = async (parent_id) => {
        this.setState({
            isReady: false
        })
        if (!parent_id) {
            parent_id = this.props.parent_id;
        }
        await service.retrieveComments(parent_id)
        .then((res) => {
            // this.comments = res.data;
            this.setState({
                comments: res.data,
                isReady: true
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    createComment = async () => {

        if(!this.state.text) {
            alert("내용을 입력하세요.")
        }
        else {
            let commentInfo = {
                text: this.state.text
            }
            await service.createComment(this.props.parent_id, commentInfo)
            .then((res) => {
                console.log('[%s] Create Comment Success', TAG);
                this.setState({
                    text: ''
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
                text: this.state.editingContents
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
            text: e.target.value
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
        const { comments } = this.state;
        console.log(comments)

        return (
            <div className="comment-area-wrapper">
                <CommentList my_id={my_id} comments={comments} deleteComment={this.deleteComment} 
                    updateComment={this.updateComment} commentInEdit={this.state.commentInEdit} 
                    setCommentInEdit={this.setCommentInEdit} editingContents={this.state.editingContents}
                    editingContentsChange={this.editingContentsChange}/>
                <div className="comment-write">
                    <textarea placeholder="댓글을 입력하세요" name="text" onChange={(e) => this.handleChange(e)} value={this.state.text}></textarea>
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