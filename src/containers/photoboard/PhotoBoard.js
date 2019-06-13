import React from 'react';
import Memory from './Memory';
import AstroPhoto from './AstroPhoto';
import Loading from 'components/Common/Loading';

const TAG = 'PHOTOBOARD'

class PhotoBoard extends React.Component {

    constructor(props) {
        super(props);
        console.log(`[${TAG}] constructor`);
    }

    render() {

        let { board_id, boardInfo, categories } = this.props;

        return (
            <div className="board-wrapper">
                {(() => {
                    if (board_id === 'brd07') {
                        return (
                            <Memory board_id={board_id} boardInfo={boardInfo} categories={categories} />
                        )
                    }
                    else if (board_id === 'brd08') {
                        return (
                            <AstroPhoto board_id={board_id} boardInfo={boardInfo} categories={categories} />
                        )
                    }
                    else if (board_id === 'brd09') {
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