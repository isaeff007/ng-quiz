/**
 * Created by ak on 20.10.2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Books */
var bookSchema ={
    added : String,
    id : String,
    imageUrl: {type : String, trim: true},
    name: {type : String, trim: true},
    author: {type : String, trim: true},
    published: {type: Number, min:0}
};

//add a static method
//bookSchema.statics.getValidatedBook = function(body){
//    //create a new instance for a book  (data holder)
//    var book = new Book();
//    book.id=body.id.replace(/ /g,''); //whit spaces are not allowed
//    book.name=body.name;
//    book.added = body.added;
//    book.published=body.published;
//    book.imageUrl=book.id+'.0.jpg';
//    book.author=body.author;
//    return book;
//};


//create amodel using the declared schema , mapped to the "books" collection
var Book = mongoose.model('Book', bookSchema, "books");

//make it avail. in Node application
module.exports=Book;

