import React from 'react';
import * as service from '../../services';
import { PhotoBoardEnum } from '../../components/Board/BoardEnum';
import Memory from '../photoboard/Memory';
import AstroPhoto from '../photoboard/AstroPhoto';
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
            // popUpState: false,
            isReady: false,
            // popUpState: false,
        }
        // this.retrieveAlbums(this.props.match.params.pbNo)
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            boardNo: props.match.params.pbNo
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[%s] shouldComponentUpdate', TAG)
    //     if(this.state.boardNo !== nextState.boardNo){
    //         nextState.isShow = false;
    //         this.retrieveAlbums(nextState.boardNo)
    //         nextState.isAlbumListReady = false;
    //         return true;
    //     }

    //     if(nextState.isAlbumListReady === true) {
    //         return true;
    //     }
    //     return false;
    // }
    
    getBoardName = (bNo) => {
        let bName = '';
        PhotoBoardEnum.forEach((board) => {
            if(board.boardNo === bNo) {
                bName = board.boardName
            }
        })
        return bName;
    }

    setIsReady = (isReady) => {
        this.setState({
            isReady: isReady
        })
    }

    // retrieveAlbums = async(boardNo) => {
    //     console.log('[%s] Retrieve Albums', TAG);

    //     await service.retrieveAlbumsInPhotoBoard(boardNo)
    //     .then((res) => {
    //         console.log('[%s] Retrieve Albums Success', TAG);
    //         this.albums = res.data;
    //         this.setState({
    //             isAlbumListReady: true
    //         })
    //     })
    //     .catch((err) => {
    //         console.error(`[${TAG}] Retrieve Albums Fail >> ${err}`)
    //     })
    // }

    render() {

        let {isAlbumListReady, boardNo} = this.state;

        return (
            <>
                {(() => {
                    // if(! isAlbumListReady) {
                        if(boardNo === 'pb01') {
                            return (
                                <Memory boardName={this.getBoardName(this.state.boardNo)} boardNo={this.state.boardNo} setIsReady={this.setIsReady} />
                            )
                        }
                        else if(boardNo === 'pb02'){
                            return (
                                <AstroPhoto boardName={this.getBoardName(this.state.boardNo)} boardNo={this.state.boardNo}/>
                            )
                        }
                        else if(boardNo === 'pb03'){
                            return (
                                <div>사진전..</div>
                            )
                        }
                        else {
                            return <Loading />                            
                        }
                    // }
                    // else {
                    //     return <Loading />
                    // }
                })()}
            </>
        );
    }
}

export default PhotoBoard