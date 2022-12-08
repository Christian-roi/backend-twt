const mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema
//schemsa
const postSchema = new Schema({
    postId:{
        type: Number,
        required: true,
        unique:true
    },
    title:{
        type:String,
    },
    content:{
        type:String,
    },
    userId:{
        type:Number,
        ref:'User'
    },
    userName:{
        type:String,
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]
});

postSchema.plugin(autoIncrement, { inc_field:'postId'});

module.exports = mongoose.model('Post', postSchema)