const { webChannelCredential } = require('./../models');

let baseResponse = {
    statusCode: 200,
    message: "Success create credentials!",
    data: null
}

module.exports = {
    store : async (req, res) => {
        try {
            const model = await webChannelCredential.create(req.body);
            baseResponse.data = model;
            res.status(200).json(baseResponse)
        } catch (error) {
            baseResponse.statusCode = 400;
            baseResponse.message = error.message;
            res.status(400).json(baseResponse);
        }
    },
    getCredential : async (req, res) => {
        try {
            const model = await webChannelCredential.findOne({
                where : {
                    id : +req.params.id
                }
            })
            baseResponse.data = model;
            res.status(200).json(baseResponse)
        } catch (error) {
            baseResponse.statusCode = 400;
            baseResponse.message = error.message;
            res.status(400).json(baseResponse);
        }
    },
    getAll : async (req, res) => {
        try {
            // TODO: Need update base on user login
            const model = await webChannelCredential.find()
            baseResponse.data = model;
            res.status(200).json(baseResponse)
        } catch (error) {
            baseResponse.statusCode = 400;
            baseResponse.message = error.message;
            res.status(400).json(baseResponse);
        }
    }
}