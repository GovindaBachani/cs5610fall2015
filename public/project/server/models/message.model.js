"use strict";

var q = require('q');

var messageSchemas = require('./message.schema.js');

module.exports = function (mongoose, db) {
    var schemaInstance = new messageSchemas(mongoose);

    var messageModel = mongoose.model('message', schemaInstance.getSchema());

    var api = {
        Create: Create,
        FindAll: FindAll,        
        Delete: Delete        
    }

    function Create(message) {
        var deferred = q.defer();
        console.log(message);
        messageModel.create(message, function (err, doc) {
            console.log(doc);
            
                deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        messageModel.find({}, function (err, docs) {
            deferred.resolve(docs);
        });
        return deferred.promise;
    }

    function Delete(id) {
        var deferred = q.defer();
        messageModel.remove({ _id: id }, function (err, status) {
            messageModel.find({}, function (err, docs) {
                deferred.resolve(docs);
            });
        });
        return deferred.promise;
    }

    return api;
}