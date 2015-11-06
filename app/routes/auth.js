module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    router = express.Router(),
    passport = settings.passport;

  router.post('/local-login', passport.authenticate('local-login', {
    successRedirect : 'views/index.html',
    failureRedirect : 'views/score.html',
    failureFlash : true
  }));

  router.post('/local-signup', passport.authenticate('local-signup', {
    successRedirect : '/views/index.html',
    failureRedirect : '/views/signup.html',
    failureFlash : true
  }));

  router.get('/login', loginGet);

  function loginGet(req, res){
    if(req.user){
      // already logged in
      res.redirect('/');
    } else {
      // not logged in, show the login form, remember to pass the message
      // for displaying when error happens
      res.send('login', { message: '??? ????.' });
      // and then remember to clear the message
      //req.session.messages = null;
    }
  }

  app.use('/auth',router);
};
