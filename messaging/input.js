const
    sender = require('./output'),
    intentResolver = require('./intent'),
    INTENTS = require('./exchange');

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
        console.log("Is about to handle intent: " + intent);
        if (intent === INTENTS.GREETINGS) {
            response = genMsgTrackingProposal();
        }
        console.log('Response is: ' + response);
        sender.respond(senderPSID, response);
    }
}

module.exports = {
    handleMessage: handleMessage
}