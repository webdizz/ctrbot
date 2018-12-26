const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "PAGE_ACCESS_TOKEN"

function respond(senderPSID, response) {
    let requestBody = {
        "recipient": {
            "id": senderPSID
        },
        "message": response
    }

    // send HTTP request to Messenger
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {
            "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": requestBody
    }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message:" + err);
        } else {
            console.log("Message sent!");
        }
    })
}

module.exports = {
    respond: respond
}