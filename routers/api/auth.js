const express = require("express");
const userController = require("../../controllers/user.controller");
const auth = express.Router();

/**
 * @swagger
 * /registration:
 *   post:
 *     tags:
 *       - Authentication
 *     title: Registrasi
 *     summary: Endpoint registration user
 *     description: create new users
 *     requestBody:
 *         description: Body Registrasi 
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Registration'
 *           application/x-www-form-urlencoded:
 *             schema:
 *                $ref: '#/components/schemas/Registration'
 *     responses:
 *       200:
 *         description: Registrasi Berhasil!
 *       400:
 *         description: Password konfirmasi tidak sesuai!
 */
auth.post("/v1/registration", userController.registration)

// Login for role user, not admin
auth.post("/v1/auth/login", userController.loginToken);

module.exports = auth;