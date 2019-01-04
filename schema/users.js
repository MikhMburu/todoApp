const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
});

module.exports = {userSchema};