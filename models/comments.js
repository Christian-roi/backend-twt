const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentId: {
        type: Number,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true });

commentSchema.plugin(autoIncrement, { inc_field: 'commentId' });

module.exports = mongoose.model('Comment', commentSchema);