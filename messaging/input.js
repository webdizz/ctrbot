const sender = require('./output')

function handleMessage(senderPSID, receivedMessage) {
    if (receivedMessage.text) {
        console.log("Is about to handle message")
        // basic text message
        response = {
            "text": `You sent the message: "${receivedMessage.text}". Now here is my response.`
        }
        sender.respond(senderPSID, response);
    }
}

module.exports = {
    handleMessage: handleMessage
}