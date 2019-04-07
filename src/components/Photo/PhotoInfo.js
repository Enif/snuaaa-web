import React from 'react';
import Image from '../Common/Image';
import { convertFullDate } from '../../utils/convertDate'

const PhotoInfo = (props) => {

    return (
        <>
            <div className="photo-wrapper">
                <Image imgSrc={props.photoInfo.file_path} />
            </div>

            <div className="photo-contents-wrapper">

                <div className="info-wrapper">
                    <h4>{props.photoInfo.title}</h4>
                    <p>{props.photoInfo.contents}</p>
                    <p>created {convertFullDate(props.photoInfo.created_at)}</p>

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
                <div className="user-wrapper">
                    <Image imgSrc={props.photoInfo.profile_path}/>
                    <div className="username">
                        {props.photoInfo.nickname}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PhotoInfo;