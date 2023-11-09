const { user } = require("../models");
const base_response = require("../libs/base-response");

module.exports = {
    registration: async (req, res, next) => {
        const { email, password, confirmationPassword, name } = req.body;

        if (password !== confirmationPassword) {
            res.status(400).json(base_response(null, "failed", "Password konfirmasi tidak sesuai!"));
        }

        try {
            const userNew = await user.registration({ email, password, name });
            res.status(200).json(base_response(userNew, "success", "Registrasi Berhasil!"));
        } catch (error) {
            res.status(400).json(base_response(null, "failed", error));
        }
    },

    /**
     * Login for genereate Token JWT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    loginToken: async (req, res, next) => {
        const { email, password } = req.body;
        user.authenticateToken({ email, password }).then(async (userData) => {
            const data = {
                id: userData.id,
                name: userData.name,
                username: userData.email,
                accessToken: await user.generateTokenV2({ id: userData.id, email: userData.email, name: userData.name }),
            }
            res.status(200).json(base_response(data, "success", "Login Berhasil!"));
        }).catch(err => {
            res.status(401).json(base_response(null, "failed", err));
        })
    }
}