/**
 * Created by ak on 20.10.2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* question model for a book*/
var questionSchema = {
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


//map the question  model with the collection "questions".
var Questions = mongoose.model("Questions", questionSchema, "questions");

//make it avail. in Node application
module.exports=Questions;

