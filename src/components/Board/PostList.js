import React from 'react';
import * as service from '../../services';

const TAG = 'POSTLIST'

class PostList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }

        this.retrievePosts();
    }


    retrievePosts = async () => {
        console.log('[%s] Retrieve Posts', TAG);

        await service.retrievePosts()
        .then((res) => {
            console.log('[%s] Retrieve Posts Success', TAG);
            console.log(res.data)
            const postData = res.data;
//            console.log(JSON.stringify(postData));
            let posts = postData.map(post => {
                return(
                    <div className="post-wrapper">
                        <div className="post-title">
                            <h5>{post.title}</h5>
                        </div>
                        <div className="post-author">
                            유저아이디
                        </div>
                    </div>
                )
            });
            this.setState({
                posts: posts
            })
            console.log(this.state.posts);
        })
        .catch((res) => {
            console.log('[%s] Retrieve Posts Fail', TAG);
        })
    }

    render() {
        return (
            <div className="post-list">
                {/* post */}
                <div className="post-wrapper">
                    {/* number */}
                    <div className="post-number">
                        300
                    </div>
                    <div className="post-title">
                        <h5>180716, 180718, 180719 소관 후기 :) [1]</h5>
                    </div>
                    <div className="post-author">
                        17최진아
                    </div>
                </div>
                {/* post */}
                <div className="post-wrapper">
                    <div className="post-number">
                        299
                    </div>
                    <div className="post-title">
                        <h5>2018년 7월 18일 (수) 조경철 천문대 소관 후기 [2]</h5>
                    </div>
                    <div className="post-author">
                        15정만근
                    </div>
                </div>
                {/* post */}
                <div className="post-wrapper">
                    <div className="post-number">
                        298
                    </div>
                    <div className="post-title">
                        <h5>180615 백마고지 소관후기 [1]</h5>
                    </div>
                    <div className="post-author">
                        17금민주
                    </div>
                </div>
                {/* post */}
                <div className="post-wrapper">
                    <div className="post-number">
                        297
                    </div>
                    <div className="post-title">
                        <h5>2018년 7월 18일 (수) 조경철 천문대 소관 후기[2]</h5>
                    </div>
                    <div className="post-author">
                        15정만근
                    </div>
                </div>
                {this.state.posts}
            </div>
        )
    }
}

export default PostList;