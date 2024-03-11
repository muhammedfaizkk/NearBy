const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email!"]
    },
    password: {
        type: String,
        select: false
    },
    userType: {
        type: String
    },
    isActive: {
        type: Boolean
    }

});

module.exports = mongoose.model("user", userSchema);
