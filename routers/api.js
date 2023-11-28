const express = require('express');
const webchannel = require('./api/webchannel');
const api = express.Router();


const features = require('./../databases/features.json');
const projects = require('./../databases/projects.json');
const auth = require('./api/auth');
const upload = require('./api/upload');
const checkToken = require('../middlewares/checkToken');

api.use("/", auth);
api.use("/v1/upload", checkToken, upload);
api.use('/', checkToken, webchannel);
api.get('/v1/features', checkToken, (req, res) => {
    res.status(200).json({
        message: "data features",
        data: features
    })
})
api.get('/v1/projects', checkToken, (req, res) => {
    res.status(200).json({
        message: "data project",
        data: projects
    })
})


module.exports = api;