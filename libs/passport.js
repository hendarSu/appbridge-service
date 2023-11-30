const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const authenticate = (req, accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log("passport callback function fired:");
    console.log(profile);

    // TODO: Record User to database
    // TODO: check if user exists in database

    done(null, profile);
};

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/google/redirect",
            passReqToCallback: true,
        },
        authenticate
    )
);

passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    return done(null, user);
} );

module.exports = passport;
