// bring express
const express = require('express');
const router = express.Router(); //creates a router
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const db = require('../db/connection.js');
const jwt = require('jsonwebtoken');

const User = require('../models/User')
// users.createIndex('username',{unique : true});
//any route comming to here is prepended with /auth

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9_]{8,30}$'))
        .min(8)
        .trim()
        .required(),
    email: Joi.string()
        .required(),
})
const logInSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9_]{8,30}$'))
        .min(8)
        .trim()
        .required(),
})


function createTokenSendResponse(user, res ,next) {
    //make payload for signing the JWT
    const payload = {
        _id: user._id,
        username: user.username
    };
    jwt.sign(payload, process.env.TOKEN_SECRET,{
        expiresIn: '1d'
    }, (err,token)=>{
       if(err){
            console.log(err);
            respondError422(res,next);
       }else
       {    //send the token
            res.json({
                token
            });
       }
    });
    
}






router.get('/', (req,res) => {
    res.json({
        message: 'yay'
    })
})

// POST /auth/signup
router.post('/signup',(req ,res,next) => {
    console.log(req.body);
    const result= schema.validate(req.body);
    // res.json(result);
    
    if(result.error == undefined){
        //make sure username is unique
        User.findOne({ username: req.body.username })
        .then( user => {
            //if user is undefined then user not in db .otherwise duplicate user detected
           if(user){
            //There is already a user with the same username
            // respone with an error
            const error = new Error('Username aready Exists'); //create error
            res.status(409);
            next(error);
           }
           else{
               //get the user into the DB
               //hash password
               bcrypt.hash(req.body.password, 12)
               .then(hashedPassword => {
                    //insert the userwith the hashed password
                    const newUser = new User({
                        username : req.body.username,
                        password : hashedPassword,
                        email: req.body.email,

                    })
                    newUser.save((err,success)=>{
                        if(err){
                            return res.status(500).json(err);
                        }
                        else{
                            return res.status(200).json(
                                {
                                    "token" : newUser.generateJwt()
                                }
                            )
                        }
                    })
               })
           }
        })

    }
    else{
       res.status(422);
       next(result.error);
    }
})

function respondError422(res,next) {
    const error = new Error('Unable to login'); //create error
    res.status(422);
    next(error);
}

// POST /auth/login
router.post('/login',(req ,res,next) => {
    console.log(req.body);
    const result= logInSchema.validate(req.body);
    if(result.error == undefined){
        //make sure username is unique
        // users.findOne({ username: req.body.username })
        User.findOne({
            "username": req.body.username,
        })
        .then( (user) => {
            //if user in database
           if(user){
               //console.log("comparing " ,req.body.password, " and ", user.password);
            //There a user with that username
            //check the hashed password with the password in DB
            bcrypt.compare( req.body.password ,user.password).then((result) => {
                
                if( result == true){
                    //passwords are match
                    // createTokenSendResponse(user, res ,next);
                    res.status(200).json({  
                        "token" : user.generateJwt()
                    })
                }
                else{
                    //if passwords are not matching
                    console.log("Password doesn't match ",result)
                    respondError422(res,next);
                }
            });
           }
           else{
               //user not in DB
               console.log("User is not in db ",user)
               respondError422(res,next);
           }
        })

    }
    else{
        respondError422(res,next);
    }
})

//make router acessible to other requirers
module.exports = router;
