import React from 'react'
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import ContentType from '../../types/ContentType';
import Viewer from '../../containers/Common/Viewer';

const SoundBox = ({ soundBoxInfo }: { soundBoxInfo: ContentType }) => {

    return (
        <div className="soundbox-wrapper">
            <Link to='/board/brd01'><div className="soundbox-title">NOTICE</div></Link>
            <div className="soundbox-contents-wrapper">
                <div className="soundbox-contents">
                    {
                        soundBoxInfo &&
                        <>
                            <Link to={`/post/${soundBoxInfo.content_id}`}>
                                <h5>{soundBoxInfo.title}</h5>
                            </Link>
                            <Viewer text={soundBoxInfo.text} />
                            {/* <ReactQuill value={soundBoxInfo.text} readOnly={true} theme="bubble" /> */}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SoundBox;
