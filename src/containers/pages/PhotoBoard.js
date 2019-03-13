import React from 'react';
import * as service from '../../services';
import { PhotoBoardEnum } from '../../components/Board/BoardEnum';
import AstroPhoto from './AstroPhoto';
import AlbumList from '../../components/PhotoBoard/AlbumList';
import CreateAlbum from '../../components/PhotoBoard/CreateAlbum';
import Loading from '../../components/Common/Loading';

const TAG = 'PHOTOBOARD'

class PhotoBoard extends React.Component {

    constructor(props) {
        super(props);
        this.albums = [];
        this.state = {
            boardNo: this.props.match.params.pbNo,
            popUpState: false,
            isAlbumListReady: false,
            popUpState: false,
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
            console.error(`[${TAG}] Retrieve Albums Fail >> ${err}`)
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {

        let {isAlbumListReady, boardNo} = this.state;

        return (
            <>
                {(() => {
                    if(isAlbumListReady) {
                        if(boardNo === 'pb01') {
                            return (
                                <div className="board-wrapper">
                                    <h2>{this.getBoardName(this.state.boardNo)}</h2>
                                    <AlbumList boardNo={this.state.boardNo} albums={this.albums} togglePopUp={this.togglePopUp}/>
                                    {
                                        this.state.popUpState && <CreateAlbum boardNo={this.state.boardNo} retrieveAlbums={this.retrieveAlbums} togglePopUp={this.togglePopUp} />
                                    }
                                </div>
                            )
                        }
                        else {
                            return (
                                <AstroPhoto boardName={this.getBoardName(this.state.boardNo)} boardNo={this.state.boardNo}/>
                            )

                        }
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