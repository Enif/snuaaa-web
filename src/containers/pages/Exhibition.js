import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import ExhibitionService from 'services/ExhibitionService';
import ContentStateEnum from 'common/ContentStateEnum';
import Loading from 'components/Common/Loading';
import CreateExhibitPhoto from 'containers/ExhibitBoard/CreateExhibitPhoto';
import ExhibitionInfo from '../../components/ExhibitBoard/ExhibitionInfo';
import ExhibitPhotoList from '../../components/ExhibitBoard/ExhibitPhotoList';

const TAG = 'EXHIBITION'

class Exhibition extends React.Component {

    constructor(props) {
        console.log(`[${TAG}] Constructor`)
        super(props);
        this.photos = [];
        this.exhibitionInfo = undefined;
        this.exhibitPhotos = undefined;
        this.state = {
            exhibition_id: this.props.match.params.exhibition_id,
            exhibitionState: ContentStateEnum.LOADING,
            popUpState: false
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        await Promise.all([
            ExhibitionService.retrieveExhibition(this.props.match.params.exhibition_id),
            ExhibitionService.retrieveExhibitPhotosinExhibition(this.props.match.params.exhibition_id)
        ])
            .then((infos) => {
                this.exhibitionInfo = infos[0].data.exhibitionInfo;
                this.exhibitPhotos = infos[1].data.exhibitPhotosInfo;
                this.setState({
                    exhibitionState: ContentStateEnum.READY
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    deleteAlbum = async () => {

        let goDrop = window.confirm("정말로 삭제하시겠습니까? 삭제한 게시글은 다시 복원할 수 없습니다.");
        if (goDrop) {
            await ExhibitionService.deleteExhibition(this.props.match.params.exhibition_id)
                .then(() => {
                    alert("게시글이 삭제되었습니다.");
                    this.setAlbumState(ContentStateEnum.DELETED);
                })
                .catch((err) => {
                    console.error(err);
                    alert("삭제 실패");
                })
        }
    }

    setAlbumState = (state) => {
        this.setState({
            exhibitionState: state
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    render() {
        const { exhibitionInfo, exhibitPhotos } = this;
        const { exhibition_id, exhibitionState, popUpState } = this.state

        return (
            <>
                {
                    (() => {
                        if (exhibitionState === ContentStateEnum.LOADING) {
                            return <Loading />
                        }
                        else if (exhibitionState === ContentStateEnum.READY || exhibitionState === ContentStateEnum.EDITTING) {
                            return (
                                <>
                                    <ExhibitionInfo exhibition_no={exhibitionInfo.exhibition.exhibition_no} slogan={exhibitionInfo.exhibition.slogan} />
                                    {
                                        <button className="board-btn-write" onClick={this.togglePopUp}>
                                            <i className="ri-image-line enif-f-1p2x"></i>사진 업로드
                                        </button>
                                    }
                                    <div className="exhibition-wrapper">
                                        <ExhibitPhotoList exhibitPhotos={exhibitPhotos} />
                                        {
                                            popUpState &&
                                            <CreateExhibitPhoto
                                                exhibition_id={exhibition_id}
                                                exhibition_no={this.exhibitionInfo.exhibition.exhibition_no}
                                                board_id={this.exhibitionInfo.board_id}
                                                fetch={this.fetch}
                                                togglePopUp={this.togglePopUp}
                                                setReadyState={() => this.setAlbumState(ContentStateEnum.READY)} />
                                        }
                                    </div>
                                </>
                            )
                        }
                        else if (exhibitionState === ContentStateEnum.DELETED) {
                            return (
                                <Redirect to={`/board/${this.exhibitionInfo.content.board_id}`} />
                            )
                        }
                        else {
                            return <Loading />
                        }
                    })()}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        my_id: state.authentication.user_id
    }
}

export default connect(mapStateToProps, null)(Exhibition);
