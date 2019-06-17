import React from 'react'
import { Link } from 'react-router-dom';
import { breakLine } from 'utils/breakLine';

const SoundBox = ({soundBoxInfo}) => {

    let contentInfo = soundBoxInfo.content;
    return(
        <div className="soundbox-wrapper">
            <Link to ='/board/brd01'><div className="soundbox-title">NOTICE</div></Link>
            <div className="soundbox-contents-wrapper">
                <div className="soundbox-contents">
                    <h5>{contentInfo && contentInfo.title}</h5>
                    <p>{breakLine(contentInfo && contentInfo.text)}</p>
                </div>
            </div>
        </div>
    )
}

export default SoundBox;
