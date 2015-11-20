/**
 * Created by ak on 17.11.2015.
 */
    'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

//define the schema for our user model
var userSchema = new Schema({
    local : {
        email : {type : String, trim: true},
        password: {type : String, trim: true},
        name : {type : String, trim: true}
    },
    google: {
        id: String,
        token : String,
        email : String,
        name : String
    }
});

//methods for the user instance:
//generate hash (encrypt the password)
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//check if password is valid
userSchema.methods.passwordIsValid = function(password){
    //return bcrypt.compareSync(password, this.local.password);
    return (password === this.local.password);
};

//create the model for user, connect it with according collection and expose it to our up.
//the collection name is optional, mongoose automatically looks for plural version of 'User' --> 'users'
var User = mongoose.model('User', userSchema, 'users');
module.exports = User;



