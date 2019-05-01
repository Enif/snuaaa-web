import React from 'react';
import * as service from '../../services';
import AlbumList from '../../components/PhotoBoard/AlbumList';
import CreateAlbum from '../../components/PhotoBoard/CreateAlbum';
import Category from '../../components/Common/Category';
import Loading from '../../components/Common/Loading';

const TAG = 'MEMORY'

class Memory extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
        this.albums = [];
        this.state = {
            popUpState: false,
            isReady: false,
        }
    }

    componentDidMount() {
        this.retrieveAlbums(this.props.board_id)
    }

    setIsReady = (isReady) => {
        this.setState({
            isReady: isReady
        })
    }

    retrieveAlbums = async (board_id) => {
        console.log('[%s] Retrieve Albums', TAG);
        this.setIsReady(false);

        await service.retrieveAlbumsInPhotoBoard(board_id)
            .then((res) => {
                console.log('[%s] Retrieve Albums Success', TAG);
                this.albums = res.data;
                this.setIsReady(true);
            })
            .catch((err) => {
                console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
            })
    }

    retrieveAlbumsByCategory = async (board_id, ctg_id) => {
        console.log('[%s] Retrieve Albums', TAG);
        this.setIsReady(false);

        await service.retrieveAlbumsInPhotoBoardByCategory(board_id, ctg_id)
            .then((res) => {
                console.log('[%s] Retrieve Albums Success', TAG);
                this.albums = res.data;
                this.setIsReady(true);
            })
            .catch((err) => {
                console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
            })
    }

    

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {
        let { isReady } = this.state;
        let { board_id, boardInfo, categories } = this.props;

        return (
            <>
                <div className="photoboard-wrapper">
                    <h2>{boardInfo.board_name}</h2>
                        <Category categories={categories} board_id={board_id} clickAll={this.retrieveAlbums} clickCategory={this.retrieveAlbumsByCategory} />
                        <div className="enif-divider"></div>
                        {(() => {
                            if (isReady) {
                                return(
                                    <>
                                        <AlbumList board_id={board_id} albums={this.albums} togglePopUp={this.togglePopUp}/>
                                        {
                                            this.state.popUpState && <CreateAlbum board_id={board_id} categories={categories} retrieveAlbums={this.retrieveAlbums} togglePopUp={this.togglePopUp} />
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