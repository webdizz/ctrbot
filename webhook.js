'use strict'

const
    express = require('express'),
    router = express.Router();

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

router.post('*', function (req, res, next) {
    let body = req.body;

    console.log('event', body.entry)
    if (body.object === 'page') {
        body.entry.forEach(function (element) {
            let webhookEvent = element.messaging[0];
            console.log('messaging payload', webhookEvent, 'text', webhookEvent.message.text);
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;