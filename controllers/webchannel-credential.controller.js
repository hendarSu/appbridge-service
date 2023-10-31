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
    }
}