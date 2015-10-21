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

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// configuration ======================================

mongoose.connect('mongodb://localhost/quiz');     // connect to quiz database created by import (s commands.txt)

//import the  models to store the data from database collections.
var Book = require("./models/book.js");
var Questions = require("./models/questions.js");
var Results = require("./models/results.js")

//allow to access from all origns (can be restricted later for specific routes)
app.use(cors());

// express REST API part ===============================
app.get('/books', function(req, res){
   Book.find(function( err, doc){
      res.send(doc);
   });
});

//get all avail. questions for selected book id (don' use the $eq operator with strings)
app.get('/books/:id',function(req, res){
   Questions.find({ bookid : req.params.id}, function (err, doc){
      res.send(doc);
   })
});

//insert the new book to the list
app.post('books/:id',function(req, res){
    //create a new instance for a bookmodel (data holder)
    var book = new Book();
    //set the properties with  POST data coming from client
    book.id=req.body.id;
    book.name==req.body.name;
    book.added = req.body.added;
    book.published=req.body.published;
    book.imageUrl=req.body.imageUrl;
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
      console.log("Successfully updated: "+ bookResult);
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
app.listen(3000);
console.log("App listening on port 3000");