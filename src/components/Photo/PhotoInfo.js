import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image';
import ProfileMini from '../Common/ProfileMini';
import ContentsStateEnum from '../../common/ContentStateEnum';
import { convertDate, convertFullDate } from '../../utils/convertDate'

const PhotoInfo = ({photoInfo, albumInfo, tagInfo, likeInfo, my_id, setPhotoState, deletePhoto, likePhoto}) => {

    const makeTagList = () => {
        let tagList = tagInfo.map((tag) => {
            return (
                <div className="tag-unit"># {tag.tag_name}</div>
            )
        })
        return tagList;
    }

    let backLink;
    if(!albumInfo) {
        backLink = `/board/brd08`;
    }
    else {
        backLink = `/album/${albumInfo.object_id}`
    }

    return (
        <>
            <div className="photo-alb-title-wrp">
                <Link to={backLink}>
                    <i className="material-icons">keyboard_backspace</i>
                </Link>
                <h5>{albumInfo && albumInfo.title}</h5>
            </div>
            <div className="photo-img-wrapper">
                <Image imgSrc={photoInfo.file_path} />
            </div>

            <div className="photo-contents-wrapper">

                <div className="info-wrapper">
                    <h4>{photoInfo.title}</h4>
                    <p>{convertFullDate(photoInfo.created_at)}</p>
                    <div className="info-tags">{makeTagList()}</div>

                    <div className="actions-wrapper">
                        {
                            (my_id === photoInfo.author_id) &&
                            <div className="edit-delete-wrapper">
                                <div className="edit-wrapper">
                                    <i className="material-icons pointer" onClick={() => setPhotoState(ContentsStateEnum.EDITTING)}>edit</i>
                                </div>
                                <div className="delete-wrapper">
                                    <i className="material-icons pointer" onClick={deletePhoto}>delete</i>
                                </div>
                            </div>
                        }
                        <div className="like-comment-num-wrapper">
                            <div className="like-num-wrapper">
                                <i className="material-icons pointer" onClick={() => likePhoto()}>
                                    {likeInfo ? 'favorite' : 'favorite_border'}
                                </i>
                                {photoInfo.like_num}
                            </div>
                            <div className="comment-num-wrapper">
                                <i className="material-icons">comment</i>
                                {photoInfo.comment_num}
                            </div>
                        </div>
                    </div>

                    <div className="enif-divider"></div>
                    <p>{photoInfo.contents}</p>
                    <div className="enif-divider"></div>

                    <table>
                        { photoInfo.date && (
                        <tr>
                            <td>Date</td>
                            <td>{convertDate(photoInfo.date)}</td>
                        </tr>)}

                        { photoInfo.location && (
                        <tr>
                            <td>Location</td>
                            <td>{photoInfo.location}</td>
                        </tr>)}

                        { photoInfo.camera && (
                        <tr>
                            <td>Camera</td>
                            <td>{photoInfo.camera}</td>
                        </tr>)}

                        { photoInfo.lens && (
                        <tr>
                            <td>Lens</td>
                            <td>{photoInfo.lens}</td>
                        </tr>)}

                        { photoInfo.focal_length && (
                        <tr>
                            <td>@</td>
                            <td>{photoInfo.focal_length}</td>
                        </tr>)}

                        { (photoInfo.f_stop || photoInfo.exposure_time || photoInfo.iso) && (
                        <tr>
                            <td>Setting</td>
                            <td>
                                {photoInfo.f_stop && <>F/{photoInfo.f_stop}</>}
                                {photoInfo.exposure_time && <> {photoInfo.exposure_time}</>}
                                {photoInfo.iso && <> ISO{photoInfo.iso}</>}
                            </td>
                        </tr>)}
                    </table>
                </div>
                <ProfileMini profileImg={photoInfo.profile_path} nickname={photoInfo.nickname} userDesc={photoInfo.introduction}/>
            </div>
        </>
    )
}

export default PhotoInfo;