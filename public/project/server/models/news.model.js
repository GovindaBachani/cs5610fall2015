/**
 * Created by Govinda on 11/30/2015.
 */

"use strict";

var q = require('q');

var newsSchema = require('./news.schema.js');

module.exports = function (mongoose, db, passport, localStrategy) {

    var schemaInstance = new newsSchema(mongoose);

    var newsModel = mongoose.model('news', schemaInstance.getSchema());

    var api = {
        
    }

    return api;

    
};
