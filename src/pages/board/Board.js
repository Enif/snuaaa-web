import React from 'react';
import Post from '../../components/Board/Post';
import PostList from '../../components/Board/PostList';
import WritePost from '../../components/Board/WritePost';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            boardState: 0,
            postId: ''
        }
    }

    setBoardState = (index) => {
        this.setState({
            boardState: index
        })
    }

    setPostId = (id) => {
        this.setState({
            postId: id
        })
    }

    render() {
        return (
            <div id="contents-center">
                <div className="board-wrapper">
                    <h2>천기누설</h2>
                    {
                        (() => {
                            console.log(`[Board] ${this.state.boardState}`);
                            if (this.state.boardState === 0) return (<PostList setBoardState={this.setBoardState} setPostId={this.setPostId} />);
                            else if (this.state.boardState === 1) return (<WritePost setBoardState={this.setBoardState}/>);
                            else if (this.state.boardState === 2) return (<Post setBoardState={this.setBoardState} postId={this.state.postId} />);
                            else return (<div>error page</div>);
                        })()
                    }
                </div>
            </div>
        );
    }
}

export default Board