import React from 'react';
import * as service from '../../services';

const TAG = 'COMMENT'

class Comment extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
    }

    render(){
        return (
            <div className="comment-area-wapper">
                <h5>댓글</h5>
                <div className="comment-list">
                    
                </div>
                <div className="comment-write">
                    <textarea placeholder="댓글을 입력하세요"></textarea>
                    <button>등록</button>
                </div>
            </div>            
        )
    }
}

export default Comment;