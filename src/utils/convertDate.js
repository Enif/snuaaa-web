exports.convertDate = function(date) {
    let convertedDate = new Date(date);
    
    let year = convertedDate.getFullYear().toString().substring(2)
    let month;
    let convertedMonth = convertedDate.getMonth();
    if(convertedMonth < 9) {
        month = '0' + (convertedMonth + 1).toString();
    }
    else {
        month = (convertedMonth + 1).toString(); 
    }
    let da = convertedDate.getDate().toString();

    return (year + "-" + month + "-" + da);
}

exports.convertFullDate = function(date) {
    let convertedDate = new Date(date);
    
    let year = convertedDate.getFullYear();
    let month = convertedDate.getMonth() < 9
        ? '0' + (convertedDate.getMonth() + 1).toString()
        : (convertedDate.getMonth() + 1).toString();
    let day = convertedDate.getDate();
    let hour = convertedDate.getHours() < 9
        ? '0' + convertedDate.getHours()
        : convertedDate.getHours();
    let min = convertedDate.getMinutes();

    return (`${year}.${month}.${day} ${hour}:${min}`);
}
