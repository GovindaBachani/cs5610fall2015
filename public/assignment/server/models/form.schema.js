"use strict"
var fieldSchema = require('./field.schema.js');
var schema = function(mongoose){
    var self = this;
    var fSchema = new fieldSchema(mongoose);
    var FieldSchema = fSchema.getSchema();
    var FormSchema = new mongoose.Schema({
        "title": String,
        "userId": String,
        "fields": [FieldSchema]
    });

    self.getSchema = function(){
        return FormSchema;
    }
};

module.exports = schema;

