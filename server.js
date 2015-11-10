/**
 * Created by ak on 08/10/15.
 */
// ================ set up to use it in the routes ========================
'use strict';
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var cors = require('cors'); //enable Cross Origin Resource Sharing
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST forms  (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(cors()); //allow to access from all origns (can be restricted later for specific routes)
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// ===============Configuration =======================
var port = process.env.PORT || 3000;
var config = require('./app/config/db');
app.set('dbUrl', config.db[app.settings.env]); //set the "dbUrl" to the mongodb url that corresponds to the environment we are currently in
var uriString = app.get('dbUrl');

//================ Authentication =====================
var passport = require('passport'),
    flash = require('connect-flash');

require('./app/config/passport')(passport);

// required for passport
app.use(session({ secret: 'thestringisusedtocreatehash' })); // session secret
app.use(passport.initialize()); //is invoked on every request. It ensures the session contains a passport.user object, which may be empty.
app.use(passport.session()); //is a Passport Strategy which will load the user object onto req.user if a serialised user object was found in the server.
//app.use(flash());

// Object that stores application level settings that are used by the routes
// This avoids the need to create global variables and also help in testing since you can inject
// any configuration you wish to test
var settings = {
    config: config,
    passport: passport
};
//======================= connect with data base =================
mongoose.connect(uriString, function(err, res){
    if (err){
        console.log('ERROR connecting to: '+uriString+'. '+err);
    }else{
        console.log('Connected to: '+uriString);
    }
});

// ====================    routes  ===============================
require('./app/routes/main')(app, settings); //checks if logged in
require('./app/routes/authRoute')(app, settings);
require('./app/routes/resultsRoute')(app, settings);
require('./app/routes/bookRoute')(app, settings);

//========================expose app==============================
module.exports = app;
//================(start app with node server.js) ================
app.listen(port);
console.log("App listening on port "+port);