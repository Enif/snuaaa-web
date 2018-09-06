import React from 'react';
import * as service from '../../services';

const TAG = 'POST'

class Post extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);

        this.state = {
            postTitle: '',
            postContents: '',
            postNo: this.props.match.params.pNo
        }

        this.retrievePost();
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        console.log(props);
        console.log(state);
        return {
            postNo: props.match.params.pNo
        }
    }

    componentDidMount(){
        console.log('[%s] componentDidMount', TAG);
    }


    retrievePost = async () => {
        console.log('[%s] Retrieve Post', TAG);
        console.log(this.props);

        await service.retrievePost(this.state.postNo)
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