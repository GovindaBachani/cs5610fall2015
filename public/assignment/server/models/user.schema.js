/**
 * Created by Govinda on 11/17/2015.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema=mongoose.Schema({
    fname  :  { type: String, required: true},
    lname  :  { type: String, required: true},
    email  :  { type: String, required: true, unique: true},
    password : { type: String, required: true}
});

UserModel = mongoose.model('User',UserSchema);

