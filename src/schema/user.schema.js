import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    username: {
        type: String,
        required: true,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 150
    },
    password: {
        type: String,
        required: true,
        max: 30,
        min: 4
    }
});

module.exports = mongoose.model("User", UserSchema);