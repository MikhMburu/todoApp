const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {todoSchema};