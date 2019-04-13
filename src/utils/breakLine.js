import React from 'react';

export function breakLine(data) {

    let contents = data.split('\n').map(line => {
        return (<>{line} <br/></>)
    })

    return contents;
}
