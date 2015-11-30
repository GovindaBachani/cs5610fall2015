/**
 * Created by Govinda on 11/17/2015.
 */
var schema = function(mongoose){
    var self = this;
    var UserSchema = new mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": {type : String, required : true, unique : true},
        "password": {type : String, required : true},
        "email": {type : String, required : true, unique : true}
    });

    self.getSchema = function(){
        return UserSchema;
    }
};

module.exports = schema;

