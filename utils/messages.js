
// need to know when the user sent a message
const moment = require('moment');

function formatMessage(username, text) {
  return {
    // message div elemnets
    // username
    username,
    // user text or message
    text,
    // time of sending message
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
