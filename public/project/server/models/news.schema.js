/**
 * Created by Govinda on 12/1/2015.
 */

var schema = function(mongoose){
    var self = this;
    var comment = mongoose.Schema({
        username: { type: String, required: true },
        date: { type: String },
        commentText: { type: String, required: true },
        email: { type: String }
    });
    var NewsSchema = new mongoose.Schema({
        "url": String,
        "text": String,
        "like": {type : String, required : true, unique : true},
        "dislike": {type : String, required : true},
        "comments":[comment]
    });

    self.getSchema = function(){
        return NewsSchema;
    }
};

module.exports = schema;