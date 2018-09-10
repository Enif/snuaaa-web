import React from 'react';
import { PhotoBoardEnum } from '../../components/Board/BoardEnum';
//import { Redirect } from 'react-router';
import AlbumList from '../../components/PhotoBoard/AlbumList';
import CreateAlbum from '../../components/PhotoBoard/CreateAlbum';
//import PostList from '../../components/Board/PostList';

const TAG = 'PHOTOBOARD'

class PhotoBoard extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            boardState: 0,
            boardNo: this.props.match.params.pbNo,
            popUpState: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            boardNo: props.match.params.pbNo
        }
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

    setBoardState = (index) => {
        this.setState({
            boardState: index
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {
        return (
            <React.Fragment>
                <div id="contents-center">
                    <div className="board-wrapper">
                        <h2>{this.getBoardName(this.state.boardNo)}</h2>
                        {
                            (() => {
                                console.log(`[PhotoBoard] ${this.state.boardState}`);
                                if (this.state.boardState === 0) return (<AlbumList boardNo={this.state.boardNo} setBoardState={this.setBoardState} togglePopUp={this.togglePopUp}/>);
                                // else if (this.state.boardState === 1) return (<WritePost boardNo={this.state.boardNo} setBoardState={this.setBoardState}/>);
                                // // else if (this.state.boardState === 2) return (<Post boardNo={this.state.boardNo} setBoardState={this.setBoardState} postId={this.state.postId} />);
                                // else if (this.state.boardState === 2) return (<Redirect to={`/post/${this.state.postId}`}/>)
                                else return (<div>error page</div>);
                            })()
                        }
                    </div>
                </div>
                {
                    this.state.popUpState && <CreateAlbum boardNo={this.state.boardNo} togglePopUp={this.togglePopUp} />
                }
            </React.Fragment>
        );
    }
}

export default PhotoBoard