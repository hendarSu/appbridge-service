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

/**
 * @swagger
 * /api/v1/projects:
 *  get:
 *      summary: Get project
 *      description: Get project
 *      tags: [Project]
 *      responses:
 *          200:
 *              description: Register success
 *              content:
 *                  application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                           message:
 *                             type: string
 *                           data:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                 cover:
 *                                   type: string
 *                                 summary:
 *                                   type: string
 *                                 link:
 *                                   type: string
 *                                 type:
 *                                   type: string
 *          400:
 *             description: Register failed
 *             content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        status:
 *                          type: string
 *                        data:
 *                          type: object
 *                          properties:
 *                        message:
 *                          type: string   
 *          401: 
 *            description: Unauthorized
 * 
*/
api.get('/v1/projects', checkToken, (req, res) => {
    res.status(200).json({
        message: "data project",
        data: projects
    })
})


module.exports = api;