const minio = require('minio');

module.exports = {
    minioClient : async () => {
        const confg = new minio.Client({
            endPoint: "play.min.io",
            port: 9000,
            accessKey : process.env.MINIO_ACCESS_KEY,
            secretKey: process.env.MINIO_SECRET_KEY
        });

        return confg;
    }
}