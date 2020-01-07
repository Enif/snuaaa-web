import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router';

import PostBoard from '../Board/PostBoard';
import DocuBoard from '../Board/DocuBoard';
import ExhibitBoard from '../Board/ExhibitBoard';
import Loading from '../../components/Common/Loading';
import history from '../../common/history';
import Memory from '../Board/Memory';
import AstroPhoto from '../Board/AstroPhoto';
import BoardContext from '../../contexts/BoardContext';

const TAG = 'BOARD'

function Board() {

    const boardContext = useContext(BoardContext);
    const match = useRouteMatch<{ board_id: string }>()

    let boardInfo = boardContext.find((board) => board.board_id === match.params.board_id)

    return (
        <>
            {(() => {
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
    )
}

export default Board