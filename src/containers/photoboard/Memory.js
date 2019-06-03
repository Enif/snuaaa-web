import React from 'react';
import * as service from 'services';
import CreateAlbum from 'containers/Album/CreateAlbum';
import AlbumList from 'components/PhotoBoard/AlbumList';
import Category from 'components/Common/Category';
import Loading from 'components/Common/Loading';
import Paginator from 'components/Common/Paginator';

const TAG = 'MEMORY'
const ALBUMROWNUM = 12;

class Memory extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
        this.albums = [];
        this.albumCount = 0;

        this.state = {
            popUpState: false,
            isReady: false,
            pageIdx: 1,
            selectedCategory: null
        }
    }

    componentDidMount() {
        this.fetch()
    }

    setIsReady = (isReady) => {
        this.setState({
            isReady: isReady
        })
    }

    fetch = async () => {
        this.setIsReady(false);

        if (this.state.selectedCategory) {
            await service.retrieveAlbumsInPhotoBoardByCategory(this.props.board_id, this.state.selectedCategory, this.state.pageIdx)
                .then((res) => {
                    console.log('[%s] Retrieve Albums Success', TAG);
                    this.albums = res.data.albumInfo;
                    this.albumCount = res.data.albumCount.count;
                    this.setIsReady(true);
                })
                .catch((err) => {
                    console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
                })
        }
        else {
            await service.retrieveAlbumsInPhotoBoard(this.props.board_id, this.state.pageIdx)
                .then((res) => {
                    console.log('[%s] Retrieve Albums Success', TAG);
                    this.albums = res.data.albumInfo;
                    this.albumCount = res.data.albumCount.count;
                    this.setIsReady(true);
                })
                .catch((err) => {
                    console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
                })
        }
    }

    clickCategory = (ctg_id) => {
        this.setState({
            selectedCategory: ctg_id
        },
            this.fetch
        )
    }

    clickAll = () => {
        this.setState({
            selectedCategory: null
        },
            this.fetch
        )
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    clickPage = (idx) => {
        this.setState({
            pageIdx: idx
        },
            this.fetch
        )
    }

    render() {
        let { isReady, pageIdx, selectedCategory } = this.state;
        let { board_id, boardInfo, categories } = this.props;

        return (
            <>
                <div className="photoboard-wrapper">
                    <h2 className="memory-title">{boardInfo.board_name}</h2>
                    <Category categories={categories} selected={selectedCategory} clickAll={this.clickAll} clickCategory={this.clickCategory} />
                    {(() => {
                        if (isReady) {
                            return (
                                <>
                                    <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.albumCount / ALBUMROWNUM)} clickPage={this.clickPage} />
                                    <div className="enif-divider"></div>
                                    <AlbumList board_id={board_id} albums={this.albums} togglePopUp={this.togglePopUp} />
                                    {
                                        this.state.popUpState && <CreateAlbum board_id={board_id} categories={categories} fetch={this.fetch} togglePopUp={this.togglePopUp} />
                                    }
                                </>)
                        }
                        else {
                            return <Loading />
                        }
                    })()}
                    {/* <div className="enif-fixed-btm"> */}
                    <button className="enif-btn-circle enif-pos-sticky" onClick={() => this.togglePopUp()}>
                        <i className="material-icons">library_add</i>
                    </button>
                    {/* </div> */}
                </div>

            </>
        );
    }
}

export default Memory