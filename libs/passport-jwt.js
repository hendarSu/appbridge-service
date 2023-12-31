const passport = require("passport");
const passportJwt = passport;

const { Strategy : JwtStrategy, ExtractJwt } = require("passport-jwt");

const { user } = require("../models");

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRETTOKEN
}

passportJwt.use(new JwtStrategy(options, async (payload, done) => {
    const user = payload.usr;
    done(null, user);
    // user.findByPk(payload.usr.id).then(user => done(null, user)).catch(err => done(err, false));
}));

module.exports = passportJwt;