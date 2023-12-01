const express = require("express");
const userController = require("../../controllers/user.controller");
const auth = express.Router();
const passport = require("../../libs/passport");

/**
 * @swagger
 * /api/v1/registration:
 *  post:
 *      summary: Register user
 *      description: Register user
 *      tags: [Auth]
 *      security: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/UserRegistration'
 *      responses:
 *          200:
 *              description: Register success
 *              content:
 *                  application/json:
 *                     schema:
 *                        type: object
 *                        properties:
 *                          status:
 *                            type: string
 *                          data:
 *                            type: object
 *                            properties:
 *                              id:
 *                                type: number
 *                              email:
 *                                type: string
 *                              password:
 *                                type: string
 *                              name:
 *                                type: string
 *                              updatedAt:
 *                                type: string
 *                              createdAt:
 *                                type: string
 *                          message:
 *                            type: string
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
 * 
*/
auth.post("/v1/registration", userController.registration)

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *      summary: Login user
 *      description: Login user
 *      tags: [Auth]
 *      security: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                         - email
 *                         - password
 *                         - confirmPassword
 *                      properties:
 *                          email:
 *                              required: true
 *                              type: string
 *                              description: Email user
 *                              example: hendar@clodeo
*                          password:
 *                             required: true
 *                             type: string
 *                             description: Password user
 *                             example: 123456
 *      responses:
 *          200:
 *              description: Login success
 *              content:
 *                  application/json:
 *                     schema:
 *                          type: object
 *                          properties:
 *                            status:
 *                              type: string
 *                            data:
 *                              type: object
 *                              properties:
 *                                id:
 *                                  type: number
 *                                name:
 *                                  type: string
 *                                username:
 *                                  type: string
 *                                accessToken:
 *                                  type: string
 *                            message:
 *                              type: string
 *          401:
 *             description: Unauthorized
*/
auth.post("/v1/auth/login", userController.loginToken);

/**
 * Generate token for user from google
 */
auth.get("/v1/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

/**
 * Redirect to home page after login with google (record token to cookie)
 */
auth.get("/v1/auth/google/redirect",
    // Set session server
    passport.authenticate("google", {
        failureRedirect: "/"
    }),

    userController.loginTokenGoogle
);

module.exports = auth;