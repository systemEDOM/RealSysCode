import mongoose from "mongoose";

let env = process.env.NODE_ENV || 'development';
let config = require('./mongo')[env];

let envUrl = process.env[config.use_env_variable];
let localUrl = `"mongodb://${config.host}:27017/${config.database}`;

let mongoUrl = envUrl ? envUrl : localUrl;

mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log("Connected to MongoDB database"));

module.exports = mongoose.connection;