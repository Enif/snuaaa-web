import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from 'components/Common/Loading';
import BoardStateEnum from 'common/BoardStateEnum';
import history from 'common/history';
import { convertDateWithDay } from 'utils/convertDate'
import BoardService from 'services/BoardService';
import BoardName from '../../components/Board/BoardName';
import Image from 'components/Common/Image';
import CreateExhibition from 'containers/ExhibitBoard/CreateExhibition';

const TAG = 'EXHIBITBOARD'

class ExhibitBoard extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)
        super(props);
        this.exhibitions = [];
        const hisState = history.location.state;
        this.state = {
            boardState: BoardStateEnum.LOADING,
            pageIdx: (hisState && hisState.page) ? hisState.page : 1,
        }
    }

    componentDidMount() {
        console.log(`[${TAG}] ComponentDidMount`)
        this.fetch()
    }

    setBoardState = (state) => {
        this.setState({
            boardState: state
        })
    }

    fetch = async () => {
        const { board_id } = this.props;

        this.setBoardState(BoardStateEnum.LOADING)
        await BoardService.retrieveExhibitionsInBoard(board_id)
            .then((res) => {
                this.exhibitions = res.data;
                this.setBoardState(BoardStateEnum.READY)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    makeExhibitionList = () => {
        const { exhibitions } = this;
        if (exhibitions && exhibitions.length > 0) {
            return exhibitions.map((exhibition) => {
                return (
                    <Link to={`/exhibition/${exhibition.content_id}`}>
                        <div className="exhibition-unit">
                            <div className="hanger"></div>
                            <div className="poster-wrapper">
                                <Image className="img-poster" imgSrc={exhibition.poster_thumbnail_path} />
                            </div>
                            <div className="desc-wrapper">
                                <div className="desc">
                                    <p>제{exhibition.exhibition_no}회 천체사진전</p>
                                    <h5>{exhibition.slogan}</h5>
                                    <p className="desc-small">{convertDateWithDay(exhibition.date_start)} ~ {convertDateWithDay(exhibition.date_end)}</p>
                                    <p className="desc-small">{exhibition.place}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })
        }
    }

    render() {
        console.log(`[${TAG}] render.. `)

        const { makeExhibitionList } = this;
        const { board_id, boardInfo, level } = this.props;
        const { boardState } = this.state;

        return (
            <>
                {
                    (() => {
                        if (boardState === BoardStateEnum.LOADING) {
                            return <Loading />
                        }
                        else if (boardState === BoardStateEnum.READY || boardState === BoardStateEnum.WRITING) {
                            return (
                                <div className="board-wrapper exhibition-board-wrapper">
                                    <BoardName board_id={boardInfo.board_id} board_name={boardInfo.board_name} />
                                    <div className="board-desc">
                                        {boardInfo.board_desc}
                                    </div>
                                    <div className="board-search-wrapper">
                                        {
                                            level >= boardInfo.lv_write &&
                                            <button className="board-btn-write" onClick={() => this.setBoardState(BoardStateEnum.WRITING)}>
                                                <i className="ri-gallery-line enif-f-1p2x"></i>
                                                <>사진전 생성</>
                                            </button>
                                        }
                                    </div>
                                    {
                                        (boardState === BoardStateEnum.READY || boardState === BoardStateEnum.WRITING) &&
                                        <>
                                            <div className="exhibition-list-wrapper">
                                                {makeExhibitionList()}
                                            </div>
                                        </>
                                    }
                                    {
                                        boardState === BoardStateEnum.WRITING &&
                                        <CreateExhibition
                                            board_id={board_id}
                                            boardInfo={boardInfo}
                                            // confirm={() => }
                                            close={() => this.setBoardState(BoardStateEnum.READY)}
                                            fetch={this.fetch} />
                                    }
                                </div>
                            )
                        }
                        else return (
                            <div>ERROR PAGE</div>
                        )
                    })()
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        level: state.authentication.level,
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(ExhibitBoard);
