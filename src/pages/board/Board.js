import React from 'react';
import PostList from '../../components/Board/PostList';
import WritePost from '../../components/Common/WritePost';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            boardState: 0
        }
    }

    setBoardState = (index) => {
        this.setState({
            boardState: index
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
                            if (this.state.boardState === 0) return (<PostList />);
                            else if (this.state.boardState === 1) return (<WritePost />);
                            else return (<div>error</div>);
                        })()
                    }

                    <button onClick={() => this.setBoardState(1)}>글쓰기</button>
                </div>
            </div>
        );
    }
}

export default Board