import React from 'react';
import Memory from './Memory';
import AstroPhoto from './AstroPhoto';
import Loading from 'components/Common/Loading';
import BoardName from '../../components/Board/BoardName';

const TAG = 'PHOTOBOARD'

class PhotoBoard extends React.Component {

    constructor(props) {
        super(props);
        console.log(`[${TAG}] constructor`);
    }

    render() {

        let { board_id, boardInfo, categories } = this.props;

        return (
            <div className="board-wrapper photoboard-wrapper">
                <BoardName board_id={board_id} board_name={boardInfo.board_name}/>
                {(() => {
                    if (board_id === 'brd31') {
                        return (
                            <Memory board_id={board_id} boardInfo={boardInfo} categories={categories} />
                        )
                    }
                    else if (board_id === 'brd32') {
                        return (
                            <AstroPhoto board_id={board_id} boardInfo={boardInfo} categories={categories} />
                        )
                    }
                    else if (board_id === 'brd33') {
                        return (
                            <div>사진전..</div>
                        )
                    }
                    else {
                        return <Loading />
                    }
                })()}
            </div>
        );
    }
}

export default PhotoBoard