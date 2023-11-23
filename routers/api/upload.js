const express = require('express');
const uploader = require('../../middlewares/uploader');
const uploadCloudinary = require('../../libs/upload-cloudinary');
const { minioClient } = require('../../config/minio');
const upload = express.Router()

const fs = require('fs');

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

upload.post('/profile', uploader.single('file'), async (req, res) => {
    const result = await uploadCloudinary(req.file.path);

    if (result) {
        res.status(200).json({
            message: "upload berhasil!",
            result: result
        })
    } else {
        res.status(400).json({
            message: "upload gagal!",
            result: null
        })
    }
})

upload.post('/product-minio', uploader.single('file'), async (req, res) => {
    let upload;

    try {
        const bucket = process.env.MINIO_BUCKET;

        const client = await minioClient();
        await client.fPutObject(
            bucket, // name bucket
            req.file.originalname, // nama file yg diupload
            req.file.path // posisi file yang di upload
        );

        upload = await client.presignedGetObject(bucket, req.file.originalname);

        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: "Upload berhasil!",
            data: upload
        })
    } catch (error) {
        fs.unlinkSync(req.file.path);
        res.status(400).json({
            message: "Upload gagal!",
            errors: error.message
        })
    }
})

module.exports = upload;