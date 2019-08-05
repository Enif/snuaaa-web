import React from 'react'
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
// import { breakLine } from 'utils/breakLine';

const SoundBox = ({ soundBoxInfo }) => {

    return (
        <div className="soundbox-wrapper">
            <Link to='/board/brd01'><div className="soundbox-title">NOTICE</div></Link>
            <div className="soundbox-contents-wrapper">
                    <div className="soundbox-contents">
                    {
                        soundBoxInfo && soundBoxInfo.content &&
                        <Link to={`/post/${soundBoxInfo.content.content_id}`}>
                            <h5>{soundBoxInfo && soundBoxInfo.content.title}</h5>
                        </Link>
                    }
                    <ReactQuill value={soundBoxInfo && soundBoxInfo.content.text} readOnly={true} theme="bubble" />
                    {/* <p>{breakLine(soundBoxInfo && soundBoxInfo.content.text)}</p> */}
                </div>
            </div>
        </div>
    )
}

export default SoundBox;
