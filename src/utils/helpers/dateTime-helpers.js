// https://www.programiz.com/online-compiler/093MIy8gJi7pD

/*== (dTime, aTime) ==*/
function compareDateTime(timeString1, timeString2) {
    let dateTime1 = new Date(timeString1);
    let dateTime2 = new Date(timeString2);

    dateTime1 = dateTime1.getTime();
    dateTime2 = dateTime2.getTime();

    return dateTime2 > dateTime1;
}


module.exports = {
    compareDateTime
}