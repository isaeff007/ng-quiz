/**
 * Created by ak on 20.10.2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** results schema */
var resultSchema = {
    "bookid": String,
    "pointsToEarn": Number,
    "pointsEarned": Number
};


//map the result  model with the collection "results".
var Results = mongoose.model("Results", resultSchema, "results");

//make it avail. in Node application
module.exports=Results;

