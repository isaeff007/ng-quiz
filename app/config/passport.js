'use strict';

var LocalStrategy   = require('passport-local').Strategy;
var async = require('async');

module.exports = function (passport) {

    var User = new require('./../models/user');
    var Book = new require('./../models/book');


    passport.serializeUser(function(user, done) {
        // user.id  is what passport will save in the session/cookie and used to retrieve the whole user object viA
        //deserializeUser function
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // Use the user id saved in the session earlier to fetch the actual user
        //and add the fetched user to "req.user"
        User.findById(id,function(err, user){
            done(err, user);
        });

    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // We name our strategy 'local-login'.
    // You can use any name you wish  This is the name you will refer to later in a route
    // that handles the login
    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true, // allows us to pass back the entire request to the callback
            session : true
        },
        function(req, email, password, done) { //email and pasword from HTML form
            //check if the user trying to login already exists
            User.findOne({'local.email': email},
                function(err,user){
                    if (err) {
                        return done(err);
                    }
                    //if no user is found - return the message
                    if(!user){
                        return done(null, false, {message: 'No user found'});
                    }

                    //if user is found but password is wrong
                    if(!user.passwordIsValid(password)){
                        return done(null, false, {message: 'Wrong password'})
                    }

                    //all is ok, return the found user
                    req.user=user;
                    return done(null, user);
                })
        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================



};
