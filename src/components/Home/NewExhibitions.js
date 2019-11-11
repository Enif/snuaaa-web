import React from 'react'
import { Link } from 'react-router-dom';
import Image from '../Common/Image';

const NewExhibitions = ({ board_id, exhibitions }) => {

    const makeExhibitionList = () => {
        if (exhibitions) {
            return exhibitions.map(exhibition => {
                return (
                    <div className="new-exhibition-list" key={exhibition.content_id}>
                        <Link to={{
                            pathname: `/exhibition/${exhibition.content_id}`
                        }}>
                            <Image imgSrc={exhibition.poster_thumbnail_path} />
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <div className="new-exhibitions-wrapper">
            <Link to={`/board/${board_id}`}>
                <h4>역대 사진전</h4>
            </Link>
            <div className="new-exhibition-flex">
                <div className="new-exhibitions-arrow left">
                    <i className="material-icons">keyboard_arrow_left</i>
                </div>
                <div className="new-exhibition-list-wrapper">
                    {makeExhibitionList()}
                </div>
                <div className="new-exhibitions-arrow right">
                    <i className="material-icons">keyboard_arrow_right</i>
                </div>
            </div>
        </div>
    )
}

export default NewExhibitions;
