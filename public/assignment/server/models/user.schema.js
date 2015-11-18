/**
 * Created by Govinda on 11/17/2015.
 */
var mongoose = require('mongoose');

var UserSchema= new mongoose.Schema({
    firstName  :  { type: String, required: true},
    lastNAme  :  { type: String, required: true},
    email  :  { type: String, required: true, unique: true},
    password : { type: String, required: true}
});

