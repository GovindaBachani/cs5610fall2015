var schema = function (mongoose) {
    var self = this;
    var TeamSchema = new mongoose.Schema({
        "teamId": { type: String, required: true, unique:true},
        "crestUrl": { type: String, required: true },
        "teamName": { type: String, required: true }
    });

    self.getSchema = function () {
        return TeamSchema;
    }
};

module.exports = schema;