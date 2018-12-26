const INTENTS = require('./exchange'),
    bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'ctrbot/messaging/intent'
});;

function resolveIntent(receivedMessage) {
    console.log('Is about to resolve intent for message: ' + receivedMessage);
    if (receivedMessage.text) {
        let message = receivedMessage.text
        let intent;
        if (message === INTENTS.ASK_TO_TRACK_ORDER) {
            intent = INTENTS.ASK_TO_TRACK_ORDER
        } else {
            // greetings
            intent = INTENTS.GREETINGS
        }
        return intent;
    }
};

module.exports = {
    resolve: resolveIntent
}