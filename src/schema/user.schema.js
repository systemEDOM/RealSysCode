import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import slug from 'mongoose-url-slugs';

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
        unique: true,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 150
    },
    password: {
        type: String,
        required: true,
        max: 30,
        min: 4
    }
}, { timestamps: true });

UserSchema.methods = {
    matchPassword: async function (password, cb) {
        return await bcrypt.compare(password, this.password);
    }
};

UserSchema.plugin(slug('username', { field: 'slugUsername' }));

module.exports = mongoose.model("User", UserSchema);