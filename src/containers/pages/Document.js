import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as service from '../../services';
import ContentStateEnum from '../../common/ContentStateEnum';
import Loading from '../../components/Common/Loading';
import DocuComponent from '../../components/Document/DocuComponent';

const TAG = 'DOCU'

class Docu extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] constructor`);
        super(props);

        this.docData = undefined;

        this.state = {
            doc_id: this.props.match.params.doc_id,
            isLiked: false,
            docState: ContentStateEnum.LOADING
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async() => {
        await service.retrieveDocument(this.state.doc_id)
        .then((res) => {
            this.docData = res.data.docuInfo;
            this.setState({
                isLiked: res.data.likeInfo,
                docState: ContentStateEnum.READY
            })
        })
        .catch((err) => {
            console.error(err);
            this.setDocState(ContentStateEnum.ERROR);
        })
    }

    setDocState = (state) => {
        this.setState({
            docState: state
        })
    }

    deleteDoc = async () => {

        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if(goDrop) {
            await service.deleteDocument(this.state.doc_id)
            .then(() => {
                alert("게시글이 삭제되었습니다.");
                this.setDocState(ContentStateEnum.DELETED);
            })
            .catch((err) => {
                console.error(err);
                alert("삭제 실패");
            })
        }
    }

    likeDoc = async() => {
        await service.likeObject(this.state.doc_id)
        .then(() => {
            if(this.state.isLiked) {
                this.docData.like_num--;
            }
            else {
                this.docData.like_num++;
            }
            this.setState({
                isLiked: !this.state.isLiked
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }


    render() {
        const { docState, isLiked } = this.state;
        const { my_id } = this.props;

        return (
            <>
            {
                (() => {
                    if(docState === ContentStateEnum.LOADING) {
                        return <Loading />
                    }
                    else if(docState === ContentStateEnum.READY) {
                        return (
                            <DocuComponent
                                docData={this.docData}
                                my_id={my_id}
                                isLiked={isLiked}
                                likeDoc={this.likeDoc}
                                deleteDoc={this.deleteDoc} />
                        )
                    }
                    else if(docState === ContentStateEnum.DELETED)
                        return (
                            <Redirect to={`/board/${this.docData.board_id}`} />
                        )
                    else {
                        return <div>ERROR</div>
                    }
                })()
            }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        my_id: state.authentication.user_id
    }
}

export default connect(mapStateToProps, null)(Docu);
