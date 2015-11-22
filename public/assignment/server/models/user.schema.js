/**
 * Created by Govinda on 11/17/2015.
 */
var schema = function(mongoose){
    var self = this;
    var UserSchema = new mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "email": String
    });

    self.getSchema = function(){
        return UserSchema;
    }
};

module.exports = schema;

