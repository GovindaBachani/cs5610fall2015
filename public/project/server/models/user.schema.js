/**
 * Created by Govinda on 11/17/2015.
 */
var schema = function(mongoose){
    var self = this;
    var UserSchema = new mongoose.Schema({
        "fullName": {type : String, required : true},
        "username": {type : String, required : true, unique : true},
        "password": { type: String },
        "email": {type : String, required: true, unique: true},
        "followers":[{type: String}],
        "following": [{ type: String }],
        "league": { type: Object },
        "team" : {type: Object}
    });

    self.getSchema = function(){
        return UserSchema;
    }
};

module.exports = schema;