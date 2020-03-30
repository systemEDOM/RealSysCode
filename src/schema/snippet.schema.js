import mongoose, { mongo } from "mongoose";
import slug from 'mongoose-url-slugs';

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        max: 200
    },
    short_description: {
        type: String,
        required: true,
        max: 200,
    },
    password: {
        type: String,
        max: 20
    },
    code: {
        type: String,
        required: true,
        max: 30,
        min: 4
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

UserSchema.plugin(slug('title', { field: 'slug' }));

module.exports = mongoose.model("Snippet", UserSchema);