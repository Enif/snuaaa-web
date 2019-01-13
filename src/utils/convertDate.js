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
