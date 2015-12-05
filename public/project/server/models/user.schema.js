/**
 * Created by Govinda on 11/17/2015.
 */
var schema = function(mongoose){
    var self = this;
    var UserSchema = new mongoose.Schema({
        "fullName": {type : String, required : true},
        "username": {type : String, required : true, unique : true},
        "password": { type: String },
        "email": {type : String},
        "followers":[{type: String}],
        "following": [{type: String}]
    });

    self.getSchema = function(){
        return UserSchema;
    }
};

module.exports = schema;