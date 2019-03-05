import React from 'react';
import Image from '../Common/Image';
import defaultProfile from '../../assets/img/profile.png'

const TAG = 'COMMENTLIST'

class CommentList extends React.Component {

    constructor(props) {
        console.log('[%s] constructor', TAG);
        super(props);
    }

    retrieveComments = () => {
        let comments = this.props.comments
        let commentList = comments.map(comment => {
            return (
                <div className="comment-wrapper">
                    <div className="profile">
                        <Image imgSrc={comment.profile_path} defaultImgSrc={defaultProfile} />
                    </div>
                    <div className="com-cont-wrp">
                        <h5>{comment.nickname}</h5>
                        <p>{comment.contents}</p>
                    </div>
                </div>
            )
        })
        return commentList

    }

    render(){
        console.log(`[${TAG}] this.props >>`)
        console.log(this.props)

        return (
            <div className="comment-list-wrapper">
                {this.retrieveComments()}
            </div>            
        )
    }
}

export default CommentList;