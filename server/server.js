/**
 * Created by ak on 08/10/15.
 */
// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var cors = require('cors'); //enable Cross Origin Resource Sharing
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost/quiz');     // connect to quiz database created by import (s commands.txt)

//define models to store the data from database collections.

/* Books */
var bookMoodel ={
   added : String,
   id : String,
   imageUrl: String,
   name: String,
   author: String,
   published: Number
};


/* question model for a book*/
var questionModel = {
   "name": String,
   "bookid": String,
   "questions": [
      {
         "_id":      Number,
         "question": String,
         "answer":   Boolean,
         "points":   Number
      }
       ]
};

/* result model for a book*/
var resultModel = {
   "bookid": String,
   "pointsToEarn": Number,
   "pointsEarned": Number
};

//allow to access from all origns (can be restricted later for specific routes)
app.use(cors());

//map the book model with the collection "books".
var Book = mongoose.model("Book", bookMoodel, "books");
//map the question  model with the collection "questions".
var Questions = mongoose.model("Questions", questionModel, "questions");
//map the result  model with the collection "results".
var Results = mongoose.model("Results", resultModel, "results");


// express REST API part =======================
app.get('/books', function(req, res){
   Book.find(function( err, doc){
      res.send(doc);
   });
   //send for each request to root "/"  the hello message back as response.
   //res.send('Hello from express, dude') ;
});

//get all avail. questions for selected book id (don' use the $eq operator with strings)
app.get('/books/:id',function(req, res){
   Questions.find({ bookid : req.params.id}, function (err, doc){
      res.send(doc);
   })
});

app.get('/results', function(req, res){
   Results.find(function( err, doc){
      res.send(doc);
   });
   //send for each request to root "/"  the hello message back as response.
   //res.send('Hello from express, dude') ;
});

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");