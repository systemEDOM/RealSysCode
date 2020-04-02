import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';
import slug from 'mongoose-url-slugs';
import slugify from 'slugify';

const Schema = mongoose.Schema;

let SnippetSchema = new Schema({
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
    language: {
        type: String,
        max: 30
    },
    code: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

SnippetSchema.pre('save', async function (next) {
    if (this.password)
        this.password = await bcrypt.hash(this.password, 10);
    next();
});

SnippetSchema.pre('updateOne', async function (next) {
    if (this._update.$set.password)
        this.set({ password: await bcrypt.hash(this._update.$set.password, 10) });

    if (this._update.title)
        this.set({ slug: slugify(this._update.title) });
    next();
});

SnippetSchema.methods = {
    matchPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    }
};

SnippetSchema.plugin(slug('title', { field: 'slug' }));

module.exports = mongoose.model("Snippet", SnippetSchema);