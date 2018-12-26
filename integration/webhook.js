const
    express = require('express'),
    router = express.Router(),
    messageHandler = require('../messaging/input'),
    postbackHandler = require('../messaging/postback');

/**
 * Handles verification calls.
 */
router.get('*', function (req, res) {
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'TOKEN';
    console.log('token', VERIFY_TOKEN, 'requested', req.query)
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.debug('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

/**
 * Handles events from Page subscription
 */
router.post('*', function (req, res, next) {
    let body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(function (element) {
            let webhookEvent = element.messaging[0];
            let senderPSID = webhookEvent.sender.id;

            if (webhookEvent.message) {
                messageHandler.handleMessage(senderPSID, webhookEvent.message);
            } else {
                postbackHandler.handlePostback(senderPSID, webhookEvent.postback)
            }
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;