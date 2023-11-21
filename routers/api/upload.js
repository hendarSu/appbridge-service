const express = require('express');
const uploader = require('../../middlewares/uploader');
const upload = express.Router()

upload.post('/product', uploader.single('file'), (req, res) => {
    res.send(req.file);
})

module.exports = upload;