import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import { Redirect, match } from 'react-router';
import { Location } from 'history';

import ContentStateEnum from '../../common/ContentStateEnum';
import Comment from '../../containers/Comment';
import Loading from '../../components/Common/Loading';
import PostComponent from '../../components/Post/PostComponent';
import EditPost from '../../components/Post/EditPost';
import history from '../../common/history';
import BoardName from '../../components/Board/BoardName';
import PostService from '../../services/PostService';
import ContentService from '../../services/ContentService';
import ContentType from '../../types/ContentType';
import AuthContext from '../../contexts/AuthContext';


const TAG = 'POST'

type PostProps = {
    match: match<{ post_id: string }>
    location: Location;
}

function Post(props: PostProps) {

    const [likeInfo, setLikeInfo] = useState<boolean>(false);
    const [postInfo, setPostInfo] = useState<ContentType>();
    const [postState, setPostState] = useState<number>(ContentStateEnum.LOADING);
    const [editingPostData, setEditingPostData] = useState({
        title: '',
        text: ''
    })
    const authInfo = useContext(AuthContext);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        let post_id = Number(props.match.params.post_id);

        await PostService.retrievePost(post_id)
            .then((res) => {
                setPostInfo(res.data.postInfo)
                setLikeInfo(res.data.likeInfo);
                setPostState(ContentStateEnum.READY);
                setEditingPostData({
                    title: res.data.postInfo.title,
                    text: res.data.postInfo.text
                })
            })
            .catch((err: any) => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.code === 4001) {
                    alert("권한이 없습니다.")
                    history.goBack();
                }
                else {
                    setPostState(ContentStateEnum.ERROR);
                }
            })
    }

    const updatePost = async () => {
        let post_id = Number(props.match.params.post_id);

        await PostService.updatePost(post_id, editingPostData)
            .then((res: any) => {
                fetch();
            })
            .catch((err: Error) => {
                console.error(err);
                alert('업데이트 오류');
            })
    }

    const deletePost = async () => {
        let post_id = Number(props.match.params.post_id);
        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if (goDrop) {
            await PostService.deletePost(post_id)
                .then(() => {
                    setPostState(ContentStateEnum.DELETED);
                })
                .catch((err: Error) => {
                    console.error(err);
                    alert("삭제 실패");
                })
        }
    }

    const likePost = async () => {
        let post_id = Number(props.match.params.post_id);

        await ContentService.likeContent(post_id)
            .then(() => {
                if (postInfo) {
                    if (likeInfo) {
                        setPostInfo({
                            ...postInfo,
                            like_num: postInfo.like_num--
                        });
                    }
                    else {
                        setPostInfo({
                            ...postInfo,
                            like_num: postInfo.like_num++
                        });
                    }
                    setLikeInfo(!likeInfo)
                }
            })
            .catch((err: Error) => {
                console.error(err)
            })
    }

    const handleEditting = (e: ChangeEvent<HTMLInputElement>) => {

        setEditingPostData({
            ...editingPostData,
            [e.target.name]: e.target.value
        })
    }

    const handleEdittingText = (value: string) => {

        setEditingPostData({
            ...editingPostData,
            text: value
        })
    }

    return (
        <>
            {
                (() => {
                    if (!postInfo) {
                        return <Loading />;
                    }
                    else if (postState === ContentStateEnum.READY) {
                        return (
                            <>
                                <BoardName
                                    board_id={postInfo.board.board_id}
                                    board_name={postInfo.board.board_name}
                                />
                                <PostComponent
                                    content={postInfo}
                                    my_id={authInfo.user_id}
                                    isLiked={likeInfo}
                                    likePost={likePost}
                                    editPost={() => setPostState(ContentStateEnum.EDITTING)}
                                    deletePost={deletePost} />
                                {
                                    (authInfo.level > 0) &&
                                    <Comment parent_id={postInfo.content_id} />
                                }
                            </>

                        )
                    }
                    else if (postState === ContentStateEnum.EDITTING)
                        return (
                            <EditPost
                                editingPostData={editingPostData}
                                handleEditting={handleEditting}
                                handleEdittingText={handleEdittingText}
                                setPostState={setPostState}
                                updatePost={updatePost} />
                        )
                    else if (postState === ContentStateEnum.DELETED)
                        return (
                            <Redirect to={`/board/${postInfo.board_id}`} />
                        )
                    else {
                        return (
                            <div>ERROR PAGE</div>
                        )
                    }
                })()
            }
        </>
    )
}

export default Post;