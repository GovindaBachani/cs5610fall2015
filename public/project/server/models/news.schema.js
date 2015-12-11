var schema = function (mongoose) {
    var self = this;
    var comment = mongoose.Schema({
        username: { type: String, required: true },
        date: { type: String },
        commentText: { type: String, required: true },
        email: { type: String }
    });
    var NewsSchema = new mongoose.Schema({
        "newsId": { type: String, required: true, unique: true },
        "content": { type: String, required: true },
        "imageUrl": { type: String },
        "titleNoFormatting": { type: String, required: true },
        "unescapedUrl": { type: String, required: true },
        "comments": [comment],
        "likes": [{ type: String, unique: true }],
        "dislikes": [{ type: String, unique: true }],
    });

    self.getSchema = function () {
        return NewsSchema;
    }
};

module.exports = schema;