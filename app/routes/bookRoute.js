/**
 * Created by ak on 05.11.2015.
 */
//import the  models to store the data from database collections.

module.exports = function(app, settings) {

    var express = require('express');
    var router = express.Router();
    var Book =  new require("./../models/book");
    var Questions = new require("./../models/questions");

    // As with any middleware it is quintessential to call next()
    // if the user is authenticated
    var  auth = function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            return next();
        }

    };


//get all avail. books , place them in the respond (books).
    router.get('/books',  function (req, res) {
        Book.find(function( err, books){
            if(err){
                return res.status(400).send({message: err});
            }else {
                res.send(books);
            }
        });

    });

//get all avail. questions for selected book id (don' use the $eq operator with strings)
    router.get('/books/:id', auth, function (req, res) {
        Questions.find({bookid: req.params.id}, function (err, books) {
            if (err) throw err;
            res.send(books);
            return next();
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

    app.use('/',router);

};