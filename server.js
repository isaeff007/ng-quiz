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
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(cors()); //allow to access from all origns (can be restricted later for specific routes)
// ===============Configuration =======================
var port = process.env.PORT || 3000;
var config = require('./app/config/db');
app.set('dbUrl', config.db[app.settings.env]); //set the "dbUrl" to the mongodb url that corresponds to the environment we are currently in
var uriString = app.get('dbUrl');

//======================= connect with data base =================
mongoose.connect(uriString, function(err, res){
    if (err){
        console.log('ERROR connecting to: '+uriString+'. '+err);
    }else{
        console.log('Connected to: '+uriString);
    }
});

// ====================    routes  ===============================
require('./app/routes/resultsRoute')(app);
require('./app/routes/bookRoute')(app);

//========================expose app==============================
module.exports = app;
//================(start app with node server.js) ================
app.listen(port);
console.log("App listening on port "+port);