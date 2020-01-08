import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import { Redirect, useRouteMatch } from 'react-router';
import { connect } from 'react-redux';

import ContentStateEnum from '../../common/ContentStateEnum';
import Loading from '../../components/Common/Loading';
import DocuComponent from '../../components/Document/DocuComponent';
import EditDocu from '../../components/Document/EditDocu';
import ContentService from '../../services/ContentService';
import DocuService from '../../services/DocuService';
import ContentType from '../../types/ContentType';
import AuthContext from '../../contexts/AuthContext';

const TAG = 'DOCU'

function Docu() {

    const match = useRouteMatch<{doc_id: string}>()
    const [docuInfo, setDocuInfo] = useState<ContentType>();
    const [likeInfo, setLikeInfo] = useState<boolean>(false);
    const [docState, setDocState] = useState<number>(ContentStateEnum.LOADING);
    const [editingDocData, setEditingDocData] = useState({
        title: '',
        text: ''
    })
    const authContext = useContext(AuthContext);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        let doc_id = Number(match.params.doc_id);
        await DocuService.retrieveDocument(doc_id)
            .then((res) => {
                setDocuInfo(res.data.docuInfo);
                setLikeInfo(res.data.likeInfo);
                setDocState(ContentStateEnum.READY);
                setEditingDocData({                    
                    title: res.data.docuInfo.title,
                    text: res.data.docuInfo.text
                })
            })
            .catch((err) => {
                console.error(err);
                setDocState(ContentStateEnum.ERROR);
            })
    }
    const handleEditting = (e: ChangeEvent<HTMLInputElement>) => {
        setEditingDocData({
            ...editingDocData,
            [e.target.name]: e.target.value
        })
    }

    const updateDoc = async () => {
        let doc_id = Number(match.params.doc_id);

        await DocuService.updateDocument(doc_id, editingDocData)
            .then((res: any) => {
                fetch();
            })
            .catch((err: Error) => {
                console.error(err);
                alert('업데이트 오류');
            })
    }

    const deleteDoc = async () => {
        let doc_id = Number(match.params.doc_id);
        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if (goDrop) {
            await DocuService.deleteDocument(doc_id)
                .then(() => {
                    setDocState(ContentStateEnum.DELETED);
                })
                .catch((err: Error) => {
                    console.error(err);
                    alert("삭제 실패");
                })
        }
    }
    
    const likeDoc = async () => {
        let doc_id = Number(match.params.doc_id);
        await ContentService.likeContent(doc_id)
            .then(() => {
                if(docuInfo) {
                    if (likeInfo) {
                        setDocuInfo({
                            ...docuInfo,
                            like_num: docuInfo.like_num--
                        })
                    }
                    else {
                        setDocuInfo({
                            ...docuInfo,
                            like_num: docuInfo.like_num++
                        })
                    }
                }
                setLikeInfo(!likeInfo);
            })
            .catch((err: Error) => {
                console.error(err)
            })
    }

    return (
        <>
            {
                (() => {
                    if (docState === ContentStateEnum.LOADING) {
                        return <Loading />
                    }
                    else if (docState === ContentStateEnum.READY) {
                        return (
                            <DocuComponent
                                docData={docuInfo}
                                my_id={authContext.authInfo.user.user_id}
                                isLiked={likeInfo}
                                likeDoc={likeDoc}
                                deleteDoc={deleteDoc}
                                setDocState={setDocState} />
                        )
                    }
                    else if (docState === ContentStateEnum.EDITTING) {
                        return (
                            <EditDocu
                                editingDocData={editingDocData}
                                handleEditting={handleEditting}
                                setDocState={setDocState}
                                updateDoc={updateDoc} />
                        )
                    }
                    else if (docState === ContentStateEnum.DELETED && docuInfo)
                        return (
                            <Redirect to={`/board/${docuInfo.board_id}`} />
                        )
                    else {
                        return <div>ERROR</div>
                    }
                })()
            }
        </>
    )

}





//     render() {
//         const { setDocState, updateDoc, handleEditting } = this;
//         const { docState, isLiked, editingDocData } = this.state;
//         const { my_id } = this.props;


//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         my_id: state.authentication.user_id
//     }
// }

export default Docu;
// export default connect(mapStateToProps, null)(Docu);
