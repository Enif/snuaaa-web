import React from 'react';
import * as service from '../../services';
import { PhotoBoardEnum } from '../../components/Board/BoardEnum';
import { Redirect } from 'react-router';
import AlbumList from '../../components/PhotoBoard/AlbumList';
import CreateAlbum from '../../components/PhotoBoard/CreateAlbum';
import Loading from '../../components/Common/Loading';

const TAG = 'PHOTOBOARD'

class PhotoBoard extends React.Component {

    constructor(props) {
        super(props);
        this.albums = [];
        this.albumId = undefined;
        this.state = {
            boardNo: this.props.match.params.pbNo,
            popUpState: false,
            isAlbumListReady: false,
            popUpState: false,
            toAlbum: false,
        }
        this.retrieveAlbums(this.props.match.params.pbNo)
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            boardNo: props.match.params.pbNo
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[%s] shouldComponentUpdate', TAG)
        if(this.state.boardNo !== nextState.boardNo){
            nextState.isShow = false;
            this.retrieveAlbums(nextState.boardNo)
            nextState.isAlbumListReady = false;
            return true;
        }

        if(nextState.isAlbumListReady === true) {
            return true;
        }
        return false;
    }
    
    getBoardName = (bNo) => {
        console.log('[%s] getBoardName', TAG);
        console.log(bNo);
        let bName = '';
        PhotoBoardEnum.forEach((board) => {
            if(board.boardNo === bNo) {
                bName = board.boardName
            }
        })
        return bName;
    }

    setIsAlbumListReady = (isReady) => {
        this.setState({
            isAlbumListReady: isReady
        })
    }

    retrieveAlbums = async(boardNo) => {
        console.log('[%s] Retrieve Albums', TAG);

        await service.retrieveAlbumsInPhotoBoard(boardNo)
        .then((res) => {
            console.log('[%s] Retrieve Albums Success', TAG);
            this.albums = res.data;
            this.setState({
                isAlbumListReady: true
            })
        })
        .catch((err) => {
            console.error(`[${TAG}] Retrieve Photos Fail >> ${err}`)
        })
    }

    redirectAlbum = (albumId) => {
        this.albumId = albumId;
        this.setState({
            toAlbum: true
        })
    }

    setAlbumId = (id) => {
        this.setState({
            albumId: id
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {

        let {toAlbum, isAlbumListReady} = this.state;

        return (
            <>
                {(() => {
                    if(toAlbum) {
                        return <Redirect to={`/album/${this.albumId}`}/>
                    }
                    else if(isAlbumListReady) {
                        return (
                            <div className="board-wrapper">
                                <h2>{this.getBoardName(this.state.boardNo)}</h2>
                                <AlbumList boardNo={this.state.boardNo} albums={this.albums} redirectAlbum={this.redirectAlbum} togglePopUp={this.togglePopUp}/>
                                {
                                    this.state.popUpState && <CreateAlbum boardNo={this.state.boardNo} retrieveAlbums={this.retrieveAlbums} togglePopUp={this.togglePopUp} />
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

export default PhotoBoard