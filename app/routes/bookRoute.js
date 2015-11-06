/**
 * Created by ak on 05.11.2015.
 */
//import the  models to store the data from database collections.

module.exports = function(app) {

   var express = require('express');
    var router = express.Router();
    var Book =  new require("./../models/book");
    var Questions = new require("./../models/questions");


//get all avail. books , place them in the respond (books).
    router.get('/books', isAuthenticated, function (req, res) {

    });

//get all avail. questions for selected book id (don' use the $eq operator with strings)
    router.get('/books/:id', isAuthenticated, function (req, res) {
        Questions.find({bookid: req.params.id}, function (err, books) {
            if (err) throw err;
            res.send(books);
        })
    });

//insert the new book to the list
    router.post('/books', function (req, res) {
        //convert received body to a valid book object
        var book = Book.getValidatedBook(req.body);

        //save the instance (save() is embedded) and check the errors.
        book.save(function (err) {
            if (err) throw err;
            res.json({message: 'new book added to list', data: book})
        })


    });

    // As with any middleware it is quintessential to call next()
// if the user is authenticated
    function isAuthenticated (req, res, next) {
        if (req.isAuthenticated())
            return next();
        //res.redirect('score.html');
        console.log("HIERRRRR");
    }


};