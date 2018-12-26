const sender = require('./output')
const INTENTS = require('./exchange');

function handlePostback(senderPSID, receivedPostback) {
    let response;

    let payload = receivedPostback.payload;
    if (payload === INTENTS.ASK_TO_TRACK_ORDER) {
        response = {
            "text": "Great! Please share your order number."
        }
    }
    
    sender.respond(senderPSID, response);
};


module.exports = {
    handlePostback: handlePostback
}