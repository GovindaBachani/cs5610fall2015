/**
 * Created by Govinda on 11/17/2015.
 */
var schema = function (mongoose) {
    var self = this;
    var MessageSchema = new mongoose.Schema({
        "emailId": { type: String, required: true },
        "message": { type: String, required: true}
    });

    self.getSchema = function () {
        return MessageSchema;
    }
};

module.exports = schema;