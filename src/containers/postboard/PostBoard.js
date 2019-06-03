import React from 'react';
import * as service from 'services'
import Loading from 'components/Common/Loading';
import PostList from 'components/Board/PostList';
import Paginator from 'components/Common/Paginator';
import CreatePost from 'containers/PostBoard/CreatePost';

const TAG = 'POSTBOARD'
const POSTROWNUM = 10;

class PostBoard extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)

        super(props);

        this.posts = [];
        this.postCount = 0;

        this.state = {
            popUpState: false,
            pageIdx: 1,
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

    clickPage = (idx) => {
        this.setState({
            pageIdx: idx
        },
            this.retrievePosts
        )
    }

    retrievePosts = async () => {
        console.log('[%s] Retrieve Posts', TAG);

        this.setIsReady(false);
        await service.retrievePostsInBoard(this.props.board_id, this.state.pageIdx)
            .then((res) => {
                console.log('[%s] Retrieve Posts Success', TAG);
                this.posts = res.data.postInfo;
                this.postCount = res.data.postCount.count;
                this.setIsReady(true);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    retrieveCategories = () => {
        // console.log(this.props.ca)
        if (this.props.categories.length > 0) {
            return (
                <select>
                    {this.props.categories.map((cate) => (<option>{cate.category_name}</option>))}
                </select>
            )
        }
    }


    render() {
        console.log(`[${TAG}] render.. `)

        const { board_id, boardInfo } = this.props;
        const { isReady, popUpState, pageIdx } = this.state;

        return (
            <div className="section-contents">
                {
                    isReady ?
                        (
                            <div className="board-wrapper">
                                <h2>{boardInfo.board_name}</h2>
                                {
                                    popUpState ?
                                        <CreatePost board_id={board_id} togglePopUp={this.togglePopUp} retrievePosts={this.retrievePosts} />
                                        :
                                        (
                                            <>
                                                {this.postCount > 0 && <Paginator pageIdx={pageIdx} pageNum={Math.ceil(this.postCount / POSTROWNUM)} clickPage={this.clickPage} />}
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