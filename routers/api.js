const express = require('express');
const webchannel = require('./api/webchannel');
const api = express.Router();


const features = require('./../databases/features.json');
const projects = require('./../databases/projects.json');
const auth = require('./api/auth');
const upload = require('./api/upload');


api.use("/", auth);
api.use("/v1/upload", upload);
api.use('/', webchannel);
api.get('/v1/features', (req, res) => {
    res.status(200).json({
        message : "data features",
        data: features
    })
})
api.get('/v1/projects', (req, res) => {
    res.status(200).json({
        message : "data project",
        data: projects
    })
})


module.exports = api;