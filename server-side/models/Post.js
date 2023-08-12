const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    userid:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 500 
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    }
},{timestamps: true});

module.exports = mongoose.model('Post', postSchema);