'use strict';
module.exports = function(app, settings){

  var  express = require('express'),
    router = express.Router(),
    passport = settings.passport; //injected from outside as part of settings object.

  //route to test if the user is logged in or not. (more ore less checking if the req.user is set or not
  router.get('/loggedin', function(req,res){
    return res.send(req.isAuthenticated()? req.user.username : '0');
  });

  //route to log in using the our defined "local-login" strategy
  router.post('/local-login', passport.authenticate('local-login'),
      //// If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user:
      function(req,res){
         return res.send(req.user);
  });

  //route to log out
  router.post('/local-login', function(req,res){
    req.logOut(); //passportjs function resetting the according user properties.
    return res.send(200);
  });

  //add prefix "/auth" to all routes above.
  app.use('/auth',router);
};
