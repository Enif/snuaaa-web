import React from 'react';
import * as service from '../../services';
import Memory from './Memory';
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
            // board_id: this.props.match.params.pbNo,
            // popUpState: false,
            isReady: false,
            // popUpState: false,
        }
        // this.retrieveAlbums(this.props.match.params.pbNo)
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log('[%s] getDerivedStateFromProps', TAG);
    //     return {
    //         board_id: props.match.params.pbNo
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[%s] shouldComponentUpdate', TAG)
    //     if(this.state.board_id !== nextState.board_id){
    //         nextState.isShow = false;
    //         this.retrieveAlbums(nextState.board_id)
    //         nextState.isAlbumListReady = false;
    //         return true;
    //     }

    //     if(nextState.isAlbumListReady === true) {
    //         return true;
    //     }
    //     return false;
    // }
    
    // getBoardName = (bNo) => {
    //     let bName = '';
    //     PhotoBoardEnum.forEach((board) => {
    //         if(board.board_id === bNo) {
    //             bName = board.boardName
    //         }
    //     })
    //     return bName;
    // }

    setIsReady = (isReady) => {
        this.setState({
            isReady: isReady
        })
    }

    // retrieveAlbums = async(board_id) => {
    //     console.log('[%s] Retrieve Albums', TAG);

    //     await service.retrieveAlbumsInPhotoBoard(board_id)
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

        let { board_id, boardInfo, categories } = this.props;
        // let {isAlbumListReady, board_id} = this.state;

        return (
            <div className="board-wrapper">
                {(() => {
                    // if(! isAlbumListReady) {
                        if(board_id === 'brd07') {
                            return (
                                <Memory board_id={board_id} boardInfo={boardInfo} categories={categories} />
                            )
                        }
                        else if(board_id === 'brd08'){
                            return (
                                <AstroPhoto board_id={board_id} boardInfo={boardInfo} categories={categories} />
                            )
                        }
                        else if(board_id === 'brd09'){
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
            </div>
        );
    }
}

export default PhotoBoard