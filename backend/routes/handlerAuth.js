//only the server has the ability to generate JWTs
//JWTs are usually included in an authorization http header via the client (Bearer)
// this auth file is for when the user chooses to NOT sign in w/ Google OAuth!
require('dotenv').config({
    path: '../.env'
});
var db = require('../models'),
    jwt = require('jsonwebtoken');


exports.signin = async function (req, res, next) {
    // if all matches
    //log them in
    try {
        //finding a user
        let user = await db.User.find({
            email: req.body.email
        });
        let {
            id,
            firstName
        } = user;
        //checkin if their password match the hashed pw
        let isMatch = await user.comparePassWord(req.body.password);
        if (isMatch) {
            let token = jwt.sign({
                    id,
                    firstName,
                    lastName
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                firstName,
                lastName,
                token
            })
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            })
        }

    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        })
    }
};

exports.signup = async function (req, res, next) {
    console.log("starting signup function");
    try {
        //create user
        // create a token (signing a token)
        //everytime a function is run, the keyword this is defined for that function
        //arr funcs dont get its own keyword this or arguments. Very important
        //never use  array functions as methods inside of objects because of this
        let user = await db.User.create(req.body);
        let {
            id,
            firstName,
            lastName,
            email
        } = user;
        let token = jwt.sign({
                id,
                firstName,
                lastName,
                email
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            firstName,
            lastName,
            email,
            token
        })
    } catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry, that username or email is taken";
        }
        console.log(err);
        return next({
            status: 400,
            message: err.message
        })
        //see what kind of err
        // if it is a certain err
        // respond with name or email already taken
        //otherwise just send back a generic 400
    }
};