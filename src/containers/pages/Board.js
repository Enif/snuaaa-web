import React from 'react';
import { Redirect } from 'react-router';
import { BoardEnum } from '../../components/Board/BoardEnum';
//import Post from '../../components/Board/Post';
import PostList from '../../components/Board/PostList';
import WritePost from '../../components/Board/WritePost';

const TAG = 'BOARD'

class Board extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            boardState: 0,
            boardNo: this.props.match.params.bNo,
            postId: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            boardNo: props.match.params.bNo
        }
    }
    
    getBoardName = (bNo) => {
        let bName = '';
        BoardEnum.forEach((board) => {
            if(board.boardNo === bNo) {
                bName = board.boardName
            }
        })
        return bName;
    }

    getCategory = (bNo) => {
        let categorys = [];
        BoardEnum.forEach((board) => {
            if(board.boardNo === bNo) {
                if (board.category) {
                    board.category.forEach((category) => {
                        categorys.push(category.categoryName)
                    })
    
                }
            }
        })
        if(categorys.length > 0) {
            return (
                <select>
                    {categorys.map((cate) => (<option>{cate}</option>))}
                </select>
            )
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
                    <h2>{this.getBoardName(this.state.boardNo)}</h2>
                    {this.getCategory(this.state.boardNo)}
                    {
                        (() => {
                            if (this.state.boardState === 0) return (<PostList boardNo={this.state.boardNo} setBoardState={this.setBoardState} setPostId={this.setPostId} />);
                            else if (this.state.boardState === 1) return (<WritePost boardNo={this.state.boardNo} setBoardState={this.setBoardState}/>);
                            // else if (this.state.boardState === 2) return (<Post boardNo={this.state.boardNo} setBoardState={this.setBoardState} postId={this.state.postId} />);
                            else if (this.state.boardState === 2) return (<Redirect to={`/post/${this.state.postId}`}/>)
                            else return (<div>error page</div>);
                        })()
                    }
                </div>
            </div>
        );
    }
}

export default Board