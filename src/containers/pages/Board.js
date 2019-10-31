import React from 'react';
import * as service from 'services';
import PostBoard from 'containers/PostBoard/PostBoard';
import PhotoBoard from 'containers/PhotoBoard/PhotoBoard';
import DocuBoard from 'containers/DocuBoard/DocuBoard';
import ExhibitBoard from 'containers/ExhibitBoard/ExhibitBoard';
import Loading from 'components/Common/Loading';
import history from 'common/history';

const TAG = 'BOARD'

class Board extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)

        super(props);

        this.categories = undefined;
        this.state = {
            isReady: false,
            boardInfo: undefined,
            board_id: this.props.match.params.bNo,
        }
    }

    componentDidMount() {
        console.log(`[${TAG}] ComponentDidMount`)
        this.retrieveBoardInfo(this.state.board_id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`[${TAG}] shouldComponentUpdate`)
        if (this.state.board_id !== nextState.board_id) {
            this.retrieveBoardInfo(nextState.board_id)
            return false;
        }
        return true;
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
        console.log('[%s] retrieveBoardInfo', TAG);

        this.setState({
            isReady: false,
            boardInfo: null
        })
        await service.retrieveBoardInfo(board_id)
            .then((res) => {
                // this.boardInfo = res.data.resBoardInfo;
                this.categories = res.data.resCategoryInfo;
                this.setState({
                    isReady: true,
                    boardInfo: res.data.resBoardInfo
                })
            })
            .catch((err) => {
                console.error(err);
                if(err.response && err.response.data && err.response.data.code === 4001) {
                    alert("권한이 없습니다.")
                    history.goBack();
                }
            })
    }

    render() {
        console.log(`[${TAG}] render.. `)
        const { boardInfo } = this.state;

        return (
            <>
                {(() => {
                    // if(this.state.isReady) {
                    if (boardInfo) {
                        if (boardInfo.board_type === 'N') {
                            return (
                                <PostBoard boardInfo={boardInfo} board_id={this.state.board_id} categories={this.categories} />
                            )
                        }
                        else if (boardInfo.board_type === 'P') {
                            return (
                                <PhotoBoard boardInfo={boardInfo} board_id={this.state.board_id} categories={this.categories} />
                            )
                        }
                        else if (boardInfo.board_type === 'D') {
                            return (
                                <DocuBoard boardInfo={boardInfo} board_id={this.state.board_id} categories={this.categories} />
                            )
                        }
                        else if (boardInfo.board_type === 'E') {
                            return (
                                <ExhibitBoard boardInfo={boardInfo} board_id={this.state.board_id} />
                            )
                        }
                    }
                    else {
                        return (
                            <Loading />
                        )
                    }
                })()}
            </>
        );
    }
}

export default Board