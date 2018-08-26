import React from 'react';
import * as service from '../../services';

const TAG = 'POST'

class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            postTitle: '',
            postContents: ''
        }

        this.retrievePost();
    }


    retrievePost = async () => {
        console.log('[%s] Retrieve Post', TAG);
        console.log(this.props);

        await service.retrievePost(this.props.postId)
        .then((res) => {
            console.log('[%s] Retrieve Post Success', TAG);
            console.log(res.data)
            const postData = res.data;
            
            this.setState({
                postTitle: postData.title,
                postContents: postData.contents
            })
        })
        .catch((res) => {
            console.log('[%s] Retrieve Post Fail', TAG);
        })
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.postTitle}
                </div>
                <div>
                    {this.state.postContents}
                </div>
            </div>
        )
    }
}

export default Post;