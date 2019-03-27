import React from 'react';
import * as service from '../../services'
import Loading from '../../components/Common/Loading';
import PostList from '../../components/Board/PostList';
import CreatePost from '../../components/Board/CreatePost';

const TAG = 'POSTBOARD'

class PostBoard extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)

        super(props);
        
        this.posts = [];
        this.state = {
            popUpState: false,
            isReady: false,
        }
    }

    componentDidMount() {
        console.log(`[${TAG}] ComponentDidMount`)
        this.retrievePosts()
    }

    componentWillUnmount() {
        console.log(`[${TAG}] ComponentWillUnmount`)

    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    setIsReady = (isReady) => {
        this.setState({
            isReady: isReady
        })
    }

    retrievePosts = async () => {
        console.log('[%s] Retrieve Posts', TAG);

        this.setIsReady(false);
        await service.retrievePostsInBoard(this.props.board_id)
        .then((res) => {
            console.log('[%s] Retrieve Posts Success', TAG);
            console.log(res.data)
            this.posts = res.data;
            this.setIsReady(true);
        })
        .catch((res) => {
            console.log('[%s] Retrieve Posts Fail', TAG);
        })
    }

    retrieveCategories = () => {
        // console.log(this.props.ca)
        if(this.props.categories.length > 0) {
            return (
                <select>
                    {this.props.categories.map((cate) => (<option>{cate.category_name}</option>))}
                </select>
            )
        }
    }
  

    render() {
        let boardName = this.props.boardInfo.board_name;
        console.log(`[${TAG}] render.. }`)
        console.log(`[${TAG}] board_name : ${boardName}`)
        return (
            <div id="contents-center">
                {(() => {
                    if(this.state.popUpState) {
                        return (
                            <CreatePost board_id={this.props.board_id} togglePopUp={this.togglePopUp} retrievePosts={this.retrievePosts}/>
                        )
                    }
                    else if(this.state.isReady) {
                        return (
                            <div className="board-wrapper">
                                <h2>{boardName}</h2>
                                {/* {this.getCategory(this.state.boardNo)} */}
                                {this.retrieveCategories()}
                                <PostList posts={this.posts} togglePopUp={this.togglePopUp} />
                                {/* {
                                    (() => {
                                        if (this.state.boardState === 0) return ();
                                        else if (this.state.boardState === 1) return (<WritePost boardNo={this.state.boardNo} setBoardState={this.setBoardState}/>);
                                        // else if (this.state.boardState === 2) return (<Post boardNo={this.state.boardNo} setBoardState={this.setBoardState} postId={this.state.postId} />);
                                        else if (this.state.boardState === 2) return (<Redirect to={`/post/${this.state.postId}`}/>)
                                        else return (<div>error page</div>);
                                    })()
                                } */}
                            </div>
                        )
                    }
                    else {
                        return (
                            <Loading />
                        )
                    }
                })()}
            </div>
        );
    }
}

export default PostBoard