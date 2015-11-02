/**
 * Created by ak on 08/10/15.
 */
// set up ========================
'use strict';
var config = require('./config');
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var cors = require('cors'); //enable Cross Origin Resource Sharing
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//import the  models to store the data from database collections.
var Book = require("./models/book");
var Questions = require("./models/questions");
var Results = require("./models/results");

// configuration ======================================
var port = process.env.PORT || 3000;
//set the "dbUrl" to the mongodb url that corresponds to the environment we are currently in
app.set('dbUrl', config.db[app.settings.env]);
var uriString = app.get('dbUrl');
//connect with data base
mongoose.connect(uriString, function(err, res){
    if (err){
        console.log('ERROR connecting to: '+uriString+'. '+err);
    }else{
        console.log('Connected to: '+uriString);
    }
});

//allow to access from all origns (can be restricted later for specific routes)
app.use(cors());

// express REST API part ===============================
//get all avail. books , place them in the respond (books).
app.get('/books', function(req, res){
   Book.find(function( err, books){
       if(err){
           return res.status(400).send({message: err.message});
       }else {
           res.send(books);
       }
   });
});

//get all avail. questions for selected book id (don' use the $eq operator with strings)
app.get('/books/:id',function(req, res){
   Questions.find({ bookid : req.params.id}, function (err, books){
      if (err) throw err;
      res.send(books);
   })
});

//insert the new book to the list
app.post('/books',function(req, res){
    //create a new instance for a book  (data holder)
    //var book = Book.getValidatedBook(req.body);
    var book = new Book();
    //set the properties with  POST data coming from client
    book.id=req.body.id.replace(/ /g,''); //whit spaces are not allowed
    book.name=req.body.name;
    book.added = req.body.added;
    book.published=req.body.published;
    book.imageUrl=book.id+'.0.jpg';
    book.author=req.body.author;

    //save the instance (save() is embedded) and check the errors.
    book.save(function(err){
        if (err) throw err;
         res.json({message: 'new book added to list', data: book})
    })


});

//get results for all books
app.get('/results', function(req, res){
   Results.find(function( err, doc){
      res.send(doc);
   });
});

//update results for specific book
app.put('/results/:id', function(req, res){
   Results.findOneAndUpdate( {bookid: req.params.id} ,{
      "pointsToEarn" : req.body.pointsToEarn,
      "pointsEarned" : req.body.pointsEarned
   } ,function(err, bookResult){
      if (err) throw err;
      res.json({message: "new result added to list", data: bookResult});
   });
});

//update book results
//Deactivated because of "bookResult"  has no method 'save' -Error. s. alternative
/*
 app.put('/results/:id', function(req, res){
 Results.find( {bookid: req.params.id} , function(err, bookResult){
 if (err) throw err;
 console.log(bookResult);
 bookResult.pointsToEarn = req.body.pointsToEarn;
 bookResult.pointsEarned = req.body.pointsEarned;
 return bookResult.save(function(err){
 if (!err) {
 console.log("book result successfully updated");
 } else {
 console.log(err);
 }
 return res.send(bookResult);
 })
 });

 });
 */
// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port "+port);