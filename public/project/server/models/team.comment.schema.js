var schema = function (mongoose) {
    var self = this;
    var comment = mongoose.Schema({
        username: { type: String, required: true },
        date: { type: String },
        commentText: { type: String, required: true },
        email: { type: String }
    });
    var TeamCommentSchema = new mongoose.Schema({
        teamId: { type: String, required: true },
        comments: [comment],
        likes: [{ type: String, unique: true }],
        dislikes: [{ type: String, unique: true }],
    });

    self.getSchema = function () {
        return TeamCommentSchema;
    }
};

module.exports = schema;