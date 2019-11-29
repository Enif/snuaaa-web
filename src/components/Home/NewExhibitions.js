import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Image from '../Common/Image';

const NUM_UNIT_DESKTOP = 4;
const NUM_UNIT_MOBILE = 2;

const NewExhibitions = ({ board_id, exhibitions }) => {

    const [viewIdx, setViewIdx] = useState(0);

    const clickPrev = function(isDesktop) {
        const NUM_UNIT = isDesktop ? NUM_UNIT_DESKTOP : NUM_UNIT_MOBILE;
        if (exhibitions && (viewIdx > (NUM_UNIT - 1))) {
            setViewIdx(viewIdx - NUM_UNIT);
        }
    }

    const clickNext = function(isDesktop) {
        const NUM_UNIT = isDesktop ? NUM_UNIT_DESKTOP : NUM_UNIT_MOBILE;
        if (exhibitions && (viewIdx < exhibitions.length - NUM_UNIT)) {
            setViewIdx(viewIdx + NUM_UNIT);
        }
    }


    const makeExhibitionList = (isDesktop) => {
        const NUM_UNIT = isDesktop ? NUM_UNIT_DESKTOP : NUM_UNIT_MOBILE;

        if (exhibitions) {
            return exhibitions.map((exhibition, idx) => {
                if(idx >= viewIdx && idx < viewIdx + NUM_UNIT) {
                    return (
                        <div className="new-exhibition-list" key={exhibition.content_id}>
                            <Link to={{
                                pathname: `/exhibition/${exhibition.content_id}`
                            }}>
                                <Image imgSrc={exhibition.poster_thumbnail_path} />
                            </Link>
                        </div>
                    )
                }
            })
        }
    }

    return (
        <div className="new-exhibitions-wrapper">
            <Link to={`/board/${board_id}`}>
                <h4>역대 사진전</h4>
            </Link>
            <div className="new-exhibition-flex"> 
                <div className="new-exhibitions-arrow left enif-hide-mobile" onClick={() => clickPrev(true)}>
                    <i className="ri-arrow-left-s-line enif-f-1p2x enif-pointer"></i>
                </div>
                {/* <div className="new-exhibitions-arrow left enif-hide-desktop" onClick={() => clickPrev(false)}>
                    <i className="ri-arrow-left-s-line enif-f-1p2x enif-pointer"></i>
                </div> */}
                <div className="new-exhibition-list-wrapper">
                    {makeExhibitionList(true)}
                </div>
                <div className="new-exhibitions-arrow right enif-hide-mobile" onClick={() => clickNext(true)}>
                    <i className="ri-arrow-right-s-line enif-f-1p2x enif-pointer"></i>
                </div>
                {/* <div className="new-exhibitions-arrow right enif-hide-desktop" onClick={() => clickNext(false)}>
                    <i className="ri-arrow-right-s-line enif-f-1p2x enif-pointer"></i>
                </div> */}
            </div>
        </div>
    )
}

export default NewExhibitions;
