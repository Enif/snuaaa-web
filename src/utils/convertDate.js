export function convertDate(date) {
    let convertedDate = new Date(date);
    
    let year = convertedDate.getFullYear().toString().substring(2);
    let month = convertedDate.getMonth() + 1;
    let day = convertedDate.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return (year + "." + month + "." + day);
}

export function convertDateWithDay(date) {
    let convertedDate = new Date(date);
    
    let year = convertedDate.getFullYear().toString();
    let month = convertedDate.getMonth() + 1;
    let day = convertedDate.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return (year + "." + month + "." + day);
}

export function convertFullDate(date) {
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

export function convertTime(time) {
    if(!time) {
        return '----'
    }
    if(time < 1000) {
        time = '0' + time;
    }
    if(time < 100) {
        time = '0' + time;
    }
    if(time < 10) {
        time = '0' + time;
    }
    return `${time.toString().substring(0, 2)}:${time.toString().substring(2)}`
}
