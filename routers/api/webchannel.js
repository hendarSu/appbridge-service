const express = require('express');
const webchannelCredentialController = require('../../controllers/webchannel-credential.controller');
const webchannel = express.Router();

webchannel.post('/v1/channelcredentials', webchannelCredentialController.store);

module.exports = webchannel;