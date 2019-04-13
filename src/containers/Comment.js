import React from 'react';
import { retrieveComments, createComment } from '../services';
import CommentList from '../components/Comment/CommentList';

const TAG = 'COMMENT'

class Comment extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
        this.comments = [];
        this.state = {
            contents: '',
            isReady: false
        }
    }

    componentDidMount() {
        this.retrieveComments(this.props.parent_id)
    }

    retrieveComments = async () => {
        console.log(`[${TAG}] Retrieve Comments`)
        this.setState({
            isReady: false
        })
        await retrieveComments(this.props.parent_id)
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
    
            await createComment(this.props.parent_id, commentInfo)
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

    handleChange = (e) => {
        this.setState({
            contents: e.target.value
        });
    }

    render() {
        return (
            <div className="comment-area-wrapper">
                <CommentList comments={this.comments} />
                <div className="comment-write">
                    <textarea placeholder="댓글을 입력하세요" name="contents" onChange={(e) => this.handleChange(e)} value={this.state.contents}></textarea>
                    <button onClick={this.createComment}>ENTER</button>
                </div>
            </div>            
        )
    }
}

export default Comment;