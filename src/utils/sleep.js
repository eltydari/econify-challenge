const sleep = (milliseconds) => {
    // Shouldn't be used in a production setting
    let endTime = new Date().getTime() + milliseconds;
    while (new Date().getTime() < endTime) { }
    return;
}

module.exports = sleep;
