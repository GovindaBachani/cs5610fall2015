/**
 * Created by Govinda on 11/17/2015.
 */
var schema = function(mongoose){
    var self = this;
    var FieldSchema = new mongoose.Schema({
        "label" : String,
        "field" : {type : String, enum: ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "DATE"]},
        "options" : [{label: String, value: String}],
        "placeholder" : String
    });

    self.getSchema = function(){
        return FieldSchema;
    }
};

module.exports = schema;

