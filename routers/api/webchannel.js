const express = require('express');
const webchannelCredentialController = require('../../controllers/webchannel-credential.controller');
const webchannel = express.Router();

webchannel.post('/v1/channelcredentials', webchannelCredentialController.store);
webchannel.get('/v1/channelcredentials/:id', webchannelCredentialController.getCredential);

module.exports = webchannel;