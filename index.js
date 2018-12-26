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

const webhook = require('./integration/webhook');
app.use('/handler', webhook);

exports.webhook = app