import React from 'react';
import Image from '../Common/Image';
import ProfileMini from '../Common/ProfileMini';
import { convertFullDate } from '../../utils/convertDate'

const PhotoInfo = (props) => {

    const makeTagList = () => {
        let tagList = props.tagInfo.map((tag) => {
            return (
                <div className="tag-unit">{tag.tag_name}</div>
            )
        })
        return tagList;
    }

    return (
        <>
            <div className="photo-wrapper">
                <Image imgSrc={props.photoInfo.file_path} />
            </div>

            <div className="photo-contents-wrapper">

                <div className="info-wrapper">
                    <h4>{props.photoInfo.title}</h4>
                    <p>{convertFullDate(props.photoInfo.created_at)}</p>
                    <div className="info-tags">{makeTagList()}</div>

                    <div className="actions-wrapper">
                        <div className="edit-delete-wrapper">
                            <div className="edit-wrapper">
                                <i className="material-icons pointer">edit</i>
                            </div>
                            <div className="delete-wrapper">
                                <i className="material-icons pointer">delete</i>
                            </div>
                        </div>
                        <div className="like-comment-num-wrapper">
                            <div className="like-num-wrapper">
                                <i className="material-icons pointer" onClick={() => props.likePhoto()}>
                                    {props.likeInfo ? 'favorite' : 'favorite_border'}
                                </i>
                                {props.photoInfo.like_num}
                            </div>
                            <div className="comment-num-wrapper">
                                <i className="material-icons">comment</i>
                                {props.photoInfo.comment_num}
                            </div>
                        </div>
                    </div>

                    <div className="enif-divider"></div>
                    <p>{props.photoInfo.contents}</p>
                    <div className="enif-divider"></div>

                    <table>
                        { props.photoInfo.date && (
                        <tr>
                            <td>Date</td>
                            <td>{props.photoInfo.date}</td>
                        </tr>)}

                        { props.photoInfo.location && (
                        <tr>
                            <td>Location</td>
                            <td>{props.photoInfo.location}</td>
                        </tr>)}

                        { props.photoInfo.camera && (
                        <tr>
                            <td>Camera</td>
                            <td>{props.photoInfo.camera}</td>
                        </tr>)}

                        { props.photoInfo.lens && (
                        <tr>
                            <td>Lens</td>
                            <td>{props.photoInfo.lens}</td>
                        </tr>)}

                        { props.photoInfo.focal_length && (
                        <tr>
                            <td>@</td>
                            <td>{props.photoInfo.focal_length}</td>
                        </tr>)}

                        { (props.photoInfo.f_stop || props.photoInfo.exposure_time || props.photoInfo.iso) && (
                        <tr>
                            <td>Setting</td>
                            <td>
                                {props.photoInfo.f_stop && <>F/{props.photoInfo.f_stop}</>}
                                {props.photoInfo.exposure_time && <> {props.photoInfo.exposure_time}</>}
                                {props.photoInfo.iso && <> ISO{props.photoInfo.iso}</>}
                            </td>
                        </tr>)}
                    </table>
                </div>
                <ProfileMini profileImg={props.photoInfo.profile_path} nickname={props.photoInfo.nickname} userDesc={props.photoInfo.introduction}/>
            </div>
        </>
    )
}

export default PhotoInfo;