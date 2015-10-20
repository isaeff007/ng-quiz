/**
 * Created by ak on 20.10.2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Books */
var bookSchema ={
    added : String,
    id : String,
    imageUrl: String,
    name: String,
    author: String,
    published: Number
};

//create amodel using the declared schema , mapped to the "books" collection
var Book = mongoose.model('Book', bookSchema, "books");

//make it avail. in Node application
module.exports=Book;

