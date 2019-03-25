import React from 'react';
import * as service from '../../services';
import AlbumList from '../../components/PhotoBoard/AlbumList';
import CreateAlbum from '../../components/PhotoBoard/CreateAlbum';
import Category from '../../components/Common/Category';
import Loading from '../../components/Common/Loading';

const TAG = 'MEMORY'

const category = [
    {
        "category_id": "ctg001",
        "category_name": "행사",
        "category_color": "#ff7b00"
    },
    {
        "category_id": "ctg002",
        "category_name": "관측",
        "category_color": "#0080ff"
    },
    {
        "category_id": "ctg003",
        "category_name": "친목",
        "category_color": "#c45454"
    }
]

class Memory extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
        this.albums = [];
        this.state = {
            popUpState: false,
            isReady: false,
        }
        this.retrieveAlbums(this.props.boardNo)
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
        console.log(this.state)
        return (
            <>
                {(() => {
                    if (isReady) {
                        return(
                            <div className="board-wrapper">
                                <h2>{this.props.boardName}</h2>
                                <Category categories={category} board_id={this.props.boardNo} clickAll={this.retrieveAlbums} clickCategory={this.retrieveAlbumsByCategory} />
                                <AlbumList boardNo={this.props.boardNo} albums={this.albums} togglePopUp={this.togglePopUp}/>
                                {
                                    this.state.popUpState && <CreateAlbum boardNo={this.props.boardNo} retrieveAlbums={this.retrieveAlbums} togglePopUp={this.togglePopUp} />
                                }
                            </div>
                        )
                    }
                    else {
                        return <Loading />
                    }
                })()}

            </>
        );
    }
}

export default Memory