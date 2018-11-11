import React from 'react';
import * as service from '../../services';

const TAG = 'WRITEPOST'

class WritePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            contents: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createPost = async () => {
        console.log('[%s] postLogIn', TAG);

        let postInfo = {
            boardNo: this.props.boardNo,
            title: this.state.title,
            contents: this.state.contents
        }

        console.log(JSON.stringify(postInfo));

        await service.createPost(postInfo)
        .then((res) => {
            console.log('[%s] Save Post Success', TAG)
            this.props.setBoardState(0);
        })
        .catch((res) => {
            console.log('[%s] Save Post Fail', TAG)
            alert("게시글 저장에 실패했습니다.");
        })
    }

    render() {
        return (
            <div className="writepost-wrapper">
                <div className="writepost-title">
                    <input name="title" value={this.state.title} onChange={this.handleChange} placeholder="제목" />
                </div>
                <div className="writepost-content">
                    <textarea name="contents" value={this.state.contents} onChange={this.handleChange} />
                </div>
                <div>
                    <button> 취소 </button>
                    <button onClick={this.createPost}> 확인 </button>
                </div>
            </div>
        )
    }
}

export default WritePost;