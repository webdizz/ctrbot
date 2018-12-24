'use strict'

const app = require('./index')

app.webhook.listen(1337, function () {
    console.log('Webhook is  listening...');
});