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

    return (year + "." + month + "." + da);
}

exports.convertFullDate = function(date) {
    let convertedDate = new Date(date);

    
    let year = convertedDate.getFullYear();
    let month = convertedDate.getMonth() + 1;
    let day = convertedDate.getDate();
    let hour = convertedDate.getHours();
    let min = convertedDate.getMinutes();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    min = min < 10 ? '0' + min : min;

    return (`${year}.${month}.${day} ${hour}:${min}`);
}
