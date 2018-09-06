import React from 'react';
import * as service from '../../services';
import Loading from '../Common/Loading';

const TAG = 'POST'

class Post extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);

        this.state = {
            postTitle: '',
            postContents: '',
            postNo: this.props.match.params.pNo,
            postState: 0,
            isShow: false
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
                postContents: postData.contents,
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
            <React.Fragment>
            {
                isShow ?
                (
                    <div className="enif-post-wrapper">
                        <div className="enif-post-title">
                            {this.state.postTitle}
                        </div>
                        <div className="enif-post-content">
                            {this.state.postContents}
                        </div>
                    </div>
                )
                :
                (
                    <Loading/>
                )
            }
            </React.Fragment>
            
        )
    }
}

export default Post;