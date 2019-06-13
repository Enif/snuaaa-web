import React from 'react';

export function breakLine(data) {

    let contents = '';

    if(data) {
        contents = data.split('\n').map((line, index) => {
            return (<span className="break-line" key={index}>{line} <br/></span>)
        })
    }

    return contents;
}
