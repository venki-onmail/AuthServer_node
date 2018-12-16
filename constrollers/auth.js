const jwt = require('jwt-simple')
const User = require('../models/user')
const moment = require('moment')
const config = require('config')

const secretKey = config.has('secretKey') ? config.get('secretKey') : "ABC";

function tokenForUser(user) {
    const timestamp = moment().valueOf();
    const expires = moment().add(1, "minutes");
    console.log("Expires in : " + expires.format());
    return jwt.encode({sub: user.id, iat: timestamp, exp: expires.valueOf()}, secretKey);
}

exports.signin = function (req, res, next) {
    // User has already had email and password auth
    res.send({token: tokenForUser(req.user)})
}

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.send(422).send({error: "Email or Password missing"})
    }

    User.findOne({email: email}, function (err, existingUser) {
        if (err) { return next(err) }

        if (existingUser) {
            return res.status(422).send({error: "Email exists"})
        }

        const user = new User({
            email: email,
            password: password
        })
        user.save(function (err) {
            if (err) { return next(err) }

            res.json({token: tokenForUser(user)})
        })
    })
}
