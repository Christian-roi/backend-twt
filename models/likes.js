const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const likesSchema = new mongoose.Schema({
    likeId: {
        type: Number,
        unique: true
    },
    postId: {
        type: Number,
        ref: 'Post'
    },
    userId : {
        type: Number,
        ref: 'User'
    },
}, {
    timestamps: true
});

likesSchema.plugin(autoIncrement, { inc_field:'likeId' });

module.exports = mongoose.model("Like", likesSchema);