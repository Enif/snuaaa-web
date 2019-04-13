import React from 'react';
import * as service from '../../services';
import Loading from '../../components/Common/Loading';
import ProfileMini from '../../components/Common/ProfileMini';
import Comment from '../Comment';
import { convertFullDate } from '../../utils/convertDate';
import { breakLine } from '../../utils/breakLine';
import PostComponent from '../../components/Post/PostComponent';

const TAG = 'POST'

class Post extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);

        this.postData = undefined;

        this.state = {
            post_id: this.props.match.params.pNo,
            isShow: false
        }
    }

    componentDidMount() {
        this.retrievePost();
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        return {
            post_id: props.match.params.pNo
        }
    }

    retrievePost = async () => {
        console.log('[%s] Retrieve Post', TAG);

        await service.retrievePost(this.state.post_id)
        .then((res) => {
            console.log('[%s] Retrieve Post Success', TAG);
            this.postData = res.data;
            this.setState({
                isShow: true
            })
        })
        .catch((res) => {
            console.log('[%s] Retrieve Post Fail', TAG);
        })
    }

    render() {
        console.log('[%s] render', TAG)
        let { isShow } = this.state;

        return (
            <>
            {
                isShow ?
                (
                    <PostComponent postData={this.postData} post_id={this.state.post_id} />
                )
                :
                (
                    <Loading/>
                )
            }
            </>
        )
    }
}

export default Post;