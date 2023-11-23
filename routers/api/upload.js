const express = require('express');
const uploader = require('../../middlewares/uploader');
const uploadCloudinary = require('../../libs/upload-cloudinary');
const upload = express.Router()

upload.post('/product', uploader.single('file'), async (req, res) => {
    const { url } = await uploadCloudinary(req.file.path);

    if (url) {
        res.status(200).json({
            message: "upload berhasil!",
            url: url
        })
    } else {
        res.status(400).json({
            message: "upload gagal!",
            url: null
        })
    }
})

module.exports = upload;