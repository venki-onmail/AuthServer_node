const auth = require('./constrollers/auth')
const passport = require('passport')
const passportService = require('./services/passport')

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

module.exports = function(app) {
    app.get("/", requireAuth, function (req, res, next) {
        res.send("Welcome to auth server");
    });
    app.post('/signin', requireSignin, auth.signin);
    app.post("/signup", auth.signup);
}