import React from 'react';
import { match } from 'react-router';

import PostBoard from '../Board/PostBoard';
import DocuBoard from '../Board/DocuBoard';
import ExhibitBoard from '../Board/ExhibitBoard';
import Loading from '../../components/Common/Loading';
import history from '../../common/history';
import BoardService from '../../services/BoardService';
import BoardType from '../../types/BoardType';
import { Location } from 'history';
import Memory from '../Board/Memory';
import AstroPhoto from '../Board/AstroPhoto';

const TAG = 'BOARD'

type BoardProps = {
    match: match<{ board_id: string }>
    location: Location;
}

type BoardState = {
    isReady: boolean;
    boardInfo?: BoardType;
}

class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);
        console.log(`[${TAG}] Constructor`)
        this.state = {
            isReady: false,
            boardInfo: undefined,
        }
    }

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps: BoardProps) {
        if (prevProps.match.params.board_id !== this.props.match.params.board_id) {
            this.fetch();
        }
    }

    fetch = async () => {
        console.log('[%s] retrieveBoardInfo', TAG);

        this.setState({
            isReady: false
        })
        await BoardService.retrieveBoardInfo(this.props.match.params.board_id)
            .then((res) => {
                this.setState({
                    isReady: true,
                    boardInfo: res.data.boardInfo
                })
            })
            .catch((err: any) => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.code === 4001) {
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
                                <PostBoard
                                    boardInfo={boardInfo}
                                    location={history.location} />
                            )
                        }
                        else if (boardInfo.board_type === 'M') {
                            return <Memory
                                boardInfo={boardInfo}
                                location={history.location} />
                        }
                        else if (boardInfo.board_type === 'A') {
                            return <AstroPhoto
                                boardInfo={boardInfo}
                                location={history.location} />
                        }
                        else if (boardInfo.board_type === 'D') {
                            return (
                                <DocuBoard
                                    boardInfo={boardInfo}
                                    location={history.location} />
                            )
                        }
                        else if (boardInfo.board_type === 'E') {
                            return (
                                <ExhibitBoard
                                    boardInfo={boardInfo} />
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