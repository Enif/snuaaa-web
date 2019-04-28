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
        window.history.pushState(null, null, window.location.pathname)
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
        console.log(`[${TAG}] render.. `)

        let { board_id, boardInfo, categories } = this.props;
        let { isReady, popUpState } = this.state;

        return (
            <div className="section-contents">
                {
                    isReady ?
                    (
                        <div className="board-wrapper">
                        <h2>{boardInfo.board_name}</h2>
                        {
                            popUpState ?                        
                            <CreatePost board_id={this.props.board_id} togglePopUp={this.togglePopUp} retrievePosts={this.retrievePosts}/>
                            :
                            (
                                <>
                                    {this.retrieveCategories()}
                                    <PostList posts={this.posts} togglePopUp={this.togglePopUp} />
                                </>
                            )
                        }
                        </div>
                    )
                    :
                    (
                        <Loading />
                    )
                }
            </div>
        );
    }
}

export default PostBoard