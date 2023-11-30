const express = require("express");
const userController = require("../../controllers/user.controller");
const auth = express.Router();
const passport = require("./../../libs/passport");

auth.post("/v1/registration", userController.registration)

// Login for role user, not admin
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