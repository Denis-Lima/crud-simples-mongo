const mongoose = require("../index")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User