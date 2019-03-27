import React from 'react';
import { BoardEnum } from '../../components/Board/BoardEnum';
import * as service from '../../services';
import PostBoard from '../postboard/PostBoard';
import Loading from '../../components/Common/Loading';

const TAG = 'BOARD'

class Board extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)

        super(props);
        
        this.boardInfo = undefined;
        this.categories = undefined;
        this.state = {
            isReady: false,
            board_id: this.props.match.params.bNo,
        }
    }

    componentDidMount() {
        console.log(`[${TAG}] ComponentDidMount`)
        this.retrieveBoardInfo(this.state.board_id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`[${TAG}] shouldComponentUpdate`)
        console.log(`[${TAG}] this.state.isReady : ${this.state.isReady}`)
        console.log(`[${TAG}] nextState.isReady : ${nextState.isReady}`)
        if(this.state.isReady && nextState.isReady) {
            this.retrieveBoardInfo(nextState.board_id)
            return false;
        }
        else {
            return true;
            // return false;
        }
        // this.retrieveBoardInfo(this.state.boardNo);
        // return true;
    }

    componentWillUnmount() {
        console.log(`[${TAG}] ComponentWillUnmount`)
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            board_id: props.match.params.bNo
        }
    }

    retrieveBoardInfo = async (board_id) => {
        this.setState({
            isReady: false
        })
        await service.retrieveBoardInfo(board_id)
        .then((res) => {
            this.boardInfo = res.data.resBoardInfo;
            this.categories = res.data.resCategoryInfo;
            this.setState({
                isReady: true
            })
        })
        .catch((err) => {
            console.error(err);
        })
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


    render() {
        console.log(`[${TAG}] render.. `)
        return (
            <div id="contents-center">
                {(() => {
                    if(this.state.isReady) {
                        if(this.boardInfo.board_type === 'N') {
                            return (
                                <PostBoard boardInfo={this.boardInfo} board_id={this.state.board_id} categories={this.categories}/>
                            )
                        }
                        else if(this.boardInfo.board_type === 'P') {
                            return (
                                <div>PhotoBoard</div>
                            )
                        }
                    }
                    else {
                        return (
                            <Loading />
                        )
                    }
                })()}
            </div>
        );
    }
}

export default Board