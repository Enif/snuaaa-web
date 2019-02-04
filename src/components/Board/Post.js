import React from 'react';
import * as service from '../../services';
import Loading from '../Common/Loading';
import Comment from '../Comment/Comment';

const TAG = 'POST'

class Post extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);

        this.state = {
            postTitle: '',
            postContents: '',
            postNo: this.props.match.params.pNo,
            postAuthor: '',
            postCreated: '',
            postState: 0,
            isShow: false
        }

        this.retrievePost();
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[%s] getDerivedStateFromProps', TAG);
        // console.log(props);
        // console.log(state);
        return {
            postNo: props.match.params.pNo
        }
    }

    convertDate(date) {
        let convertedDate = new Date(date);
        
        let year = convertedDate.getFullYear().toString().substring(2)
        let month;
        let convertedMonth = convertedDate.getMonth();
        if(convertedMonth < 10) {
            month = '0' + (convertedMonth + 1).toString();
        }
        else {
            month = (convertedMonth + 1).toString(); 
        }
        let da = convertedDate.getDate().toString();

        return (year + "-" + month + "-" + da);
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

            let contents = postData.contents.split('\n').map(line => {
                return line + "<br>"
            })
            // postData.contents = postData.contents.replace((/(\n|\r\n)/g, '<br/>'));
            
            this.setState({
                postTitle: postData.title,
                postContents: postData.contents,
                postAuthor: postData.nickname,
                postCreated: postData.created_at,    
                isShow: true
            })
            console.log( postData.contents)
        })
        .catch((res) => {
            console.log('[%s] Retrieve Post Fail', TAG);
        })
    }

    render() {
        console.log('[%s] render', TAG)
        let { isShow, postCreated } = this.state;

        let date;
        if(postCreated) {
            date = this.convertDate(postCreated)
        }
        return (
            <React.Fragment>
            {
                isShow ?
                (
                    <div className="enif-post-wrapper">
                        <div className="enif-post-title">
                            <h5>{this.state.postTitle}</h5>
                            <div className="post-title-info">
                                {this.state.postAuthor}
                                <p>
                                    {date}
                                </p>
                            </div>
                        </div>
                        <div className="enif-post-content">
                            {this.state.postContents.split('\n').map(line => {
                                return (<span>{line} <br/></span>)
                            })
                        }
                        </div>
                        <Comment postNo={this.state.postNo}/>
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