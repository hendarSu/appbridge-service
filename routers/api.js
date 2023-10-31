const express = require('express');
const webchannel = require('./api/webchannel');
const api = express.Router();

api.use('/', webchannel);

module.exports = api;