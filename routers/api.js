const express = require('express');
const webchannel = require('./api/webchannel');
const api = express.Router();


const features = require('./../databases/features.json');
const projects = require('./../databases/projects.json');


api.use('/', webchannel);

api.use('/v1/features', (req, res) => {
    res.status(200).json({
        message : "data features",
        data: features
    })
})
api.use('/v1/projects', (req, res) => {
    res.status(200).json({
        message : "data project",
        data: projects
    })
})


module.exports = api;