import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import slug from 'mongoose-url-slugs';
import slugify from 'slugify';

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
    },
    snippets: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Snippet' }
    ]
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.pre('updateOne', async function (next) {
    if (this._update.$set.password)
        this.set({ password: await bcrypt.hash(this._update.$set.password, 10) });

    if (this._update.username)
        this.set({ slugUsername: slugify(this._update.username) });
    next();
});

UserSchema.methods = {
    matchPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    }
};

UserSchema.plugin(slug('username', { field: 'slugUsername', update: true, alwaysRecreate: true }));

module.exports = mongoose.model("User", UserSchema);