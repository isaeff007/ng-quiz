/**
 * Created by ak on 05.11.2015.
 */
'use strict';
    //grab the result model
var Results = new require("./../models/results");

module.exports = function(app){

//=================== results ===============================
//get results for all books
app.get('/results', function(req, res){
    Results.find(function( err, doc){
        if(err){
            return res.status(400).send({message: err.message});
        }else {
            res.send(doc);
        }
    });
});

//update results for specific book
app.put('/results/:id', function(req, res){
    Results.findOneAndUpdate( {bookid: req.params.id} ,{
        "pointsToEarn" : req.body.pointsToEarn,
        "pointsEarned" : req.body.pointsEarned
    } ,function(err, bookResult){
        if (err) throw err;
        res.redirect('..');
    });
});
};