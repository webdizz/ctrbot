'use strict'

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    cors = require("cors"),
    path = require('path'),
    logger = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const webhook = require('./webhook');
app.use('/handler', webhook);

app.listen(1337, function () {
    console.log('Webhook is  listening...');
});

exports.webhook = webhook