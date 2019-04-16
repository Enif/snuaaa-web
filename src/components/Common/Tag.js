import React, { useState, useEffect } from 'react';

function Tag({clickAll, clickTag, tags, selectedTags}) {

    const [selectedAll, setSelectedAll] = useState(false);

    useEffect(() => {
        if(selectedTags.length === 0) {
            setSelectedAll(true);
        }
        else {
            setSelectedAll(false);
        }
    })

    const makeTagList = (tags) => {
        // console.log(tags)
        const tagList = tags.map((tag) => {
            return (
                <div className="tag-unit">
                    <input type="checkbox" id={tag.tag_id} checked={selectedTags.includes(tag.tag_id)}
                    onChange={(e) => clickTag(e)} />
                    <label htmlFor={tag.tag_id}>#{tag.tag_name}</label>
                </div>
            )
        })
        return tagList;
    }

    return (
        <div className="tag-wrapper">
            <div className="tag-unit tag-all">
                <input type="checkbox" id="all" checked={selectedAll}
                onChange={() => clickAll()} />
                <label htmlFor="all">ALL</label>
            </div>
            {makeTagList(tags)}
        </div>
    )
}

export default Tag;