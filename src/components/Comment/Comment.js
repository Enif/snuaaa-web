import React from 'react';
import { createComment } from '../../services';

const TAG = 'COMMENT'

class Comment extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);

        this.state = {
            contents: 'gg'
        }
    }

    createComment = async () => {
        console.log('[%s] Create Comment', TAG);

        let commentInfo = {
            contents: this.state.contents
        }

        await createComment(this.props.postNo, commentInfo)
        .then((res) => {
            console.log('[%s] Create Comment Success', TAG);
        })
        .catch((res) => {
            console.log('[%s] Create Comment Fail', TAG);
        })
    }

    render(){
        return (
            <div className="comment-area-wapper">
                <h5>댓글</h5>
                <div className="comment-list">
                    
                </div>
                <div className="comment-write">
                    <textarea placeholder="댓글을 입력하세요"></textarea>
                    <button onClick={this.createComment}>등록</button>
                </div>
            </div>            
        )
    }
}

export default Comment;