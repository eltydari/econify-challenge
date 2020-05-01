const moment = require('moment');

module.exports.validateDate = (dateString) => {
    return moment(dateString, 'YYYY-MM-DD', true).isValid()
};

module.exports.validateTime = (timeString) => {
    return moment(timeString, 'hh:mm', true).isValid()
};
