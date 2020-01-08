import React, { ChangeEvent } from 'react';

import CommentList from '../components/Comment/CommentList';
import CommentService from '../services/CommentService';
import AuthContext from '../contexts/AuthContext';

const TAG = 'COMMENT'

type CommentProps = {
    parent_id: number;
}

type CommentState = {
    comments: any;
    text: string;
    isReady: boolean;
    commentInEdit: number;
    editingContents: string;
}

class Comment extends React.Component<CommentProps, CommentState> {

    constructor(props: CommentProps) {
        super(props);
        console.log('[%s] constructor', TAG);

        this.state = {
            comments: [],
            text: '',
            isReady: false,
            commentInEdit: -1,
            editingContents: ''
        }
    }

    componentDidMount() {
        this.retrieveComments(this.props.parent_id)
    }

    componentDidUpdate(prevProps: CommentProps) {
        console.log(prevProps)
    }

    shouldComponentUpdate(nextProps: CommentProps, nextState: CommentState) {
        if (this.props.parent_id !== nextProps.parent_id) {
            this.retrieveComments(nextProps.parent_id);
        }
        return true;
    }

    setCommentInEdit = (comment_id: number, text: string) => {
        this.setState({
            commentInEdit: comment_id,
            editingContents: text
        })
    }

    retrieveComments = async (parent_id?: number) => {
        this.setState({
            isReady: false
        })
        if (!parent_id) {
            parent_id = this.props.parent_id;
        }
        await CommentService.retrieveComments(parent_id)
            .then((res: any) => {
                // this.comments = res.data;
                this.setState({
                    comments: res.data,
                    isReady: true
                })
            })
            .catch((err: Error) => {
                console.error(err)
            })
    }

    createComment = async () => {

        if (!this.state.text) {
            alert("내용을 입력하세요.")
        }
        else {
            let commentInfo = {
                text: this.state.text
            }
            await CommentService.createComment(this.props.parent_id, commentInfo)
                .then((res: any) => {
                    console.log('[%s] Create Comment Success', TAG);
                    this.setState({
                        text: ''
                    })
                    this.retrieveComments();
                })
                .catch((err: Error) => {
                    console.error(err);
                    alert("댓글 작성 실패");
                })
        }
    }

    updateComment = async (comment_id: number) => {
        console.log(`[${TAG}] Update Comment`);
        this.setState({
            isReady: false
        })
        if (!this.state.editingContents) {
            alert("내용을 입력하세요.")
        }
        else {
            let commentInfo = {
                text: this.state.editingContents
            }

            await CommentService.updateComment(comment_id, commentInfo)
                .then((res: any) => {
                    console.log('[%s] Update Comment Success', TAG);
                    this.setState({
                        commentInEdit: 0,
                        editingContents: ''
                    })
                    this.retrieveComments();
                })
                .catch((err: Error) => {
                    console.error(err);
                    alert("댓글 업데이트 실패");
                })
        }
    }

    deleteComment = async (comment_id: number) => {
        console.log(`[${TAG}] Delete Comment`);
        let goDrop = window.confirm("정말로 삭제하시겠습니까?");
        if (goDrop) {

            await CommentService.deleteComment(comment_id)
                .then(() => {
                    console.log('[%s] Delete Comment Success', TAG);
                    this.retrieveComments();
                })
                .catch((err: Error) => {
                    console.error(err);
                    alert("댓글 삭제 실패");
                })
        }
    }



    handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            text: e.target.value
        });
    }

    editingContentsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            editingContents: e.target.value
        });
    }


    render() {
        console.log(`[${TAG}] render..`);
        // const { my_id } = this.props;
        const { comments } = this.state;

        return (
            <AuthContext.Consumer>
                {authContext => (
                    <div className="comment-area-wrapper">
                        <CommentList my_id={authContext.authInfo.user.user_id} comments={comments} deleteComment={this.deleteComment}
                            updateComment={this.updateComment} commentInEdit={this.state.commentInEdit}
                            setCommentInEdit={this.setCommentInEdit} editingContents={this.state.editingContents}
                            editingContentsChange={this.editingContentsChange} />
                        <div className="comment-write">
                            <textarea placeholder="댓글을 입력하세요" name="text" onChange={this.handleChange} value={this.state.text}></textarea>
                            <button onClick={this.createComment}>ENTER</button>
                        </div>
                    </div>
                )}

            </AuthContext.Consumer>
        )
    }
}

export default Comment;
