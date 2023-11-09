const passportJwt = require("../libs/passport-jwt");

module.exports = passportJwt.authenticate('jwt', {
    session: false
});