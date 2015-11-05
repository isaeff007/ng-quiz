/**
 * Created by ak on 20.10.2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** results schema */
var resultSchema = {
    "bookid": {type : String, trim: true, required: true},
    "pointsToEarn": {type: Number, default: 0},
    "pointsEarned": {type: Number, default: 0}
};


//map the result  model with the collection "results".
var Results = mongoose.model("Results", resultSchema, "results");

//make it avail. in Node application
module.exports=Results;

