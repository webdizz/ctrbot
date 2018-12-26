const
    sender = require('./output'),
    intentResolver = require('./intent'),
    INTENTS = require('./exchange'),
    bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'ctrbot/messaging/input'
});;

function handleMessage(senderPSID, receivedMessage) {

    function genMsgTrackingProposal() {
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Hi! Would you like to track your order?",
                    "buttons": [{
                        "type": "postback",
                        "title": "Yes",
                        "payload": INTENTS.ASK_TO_TRACK_ORDER
                    }]
                }
            }
        }
    };

    if (receivedMessage.text) {
        let intent = intentResolver.resolve(receivedMessage);
        let response;
        log.info("Is about to handle intent: " + intent);
        if (intent === INTENTS.GREETINGS) {
            response = genMsgTrackingProposal();
        }
        log.info('Response is: ' + response);
        sender.respond(senderPSID, response);
    }
}

module.exports = {
    handleMessage: handleMessage
}