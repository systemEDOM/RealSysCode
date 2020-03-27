import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/realsyscode_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log("Connected to MongoDB database"));

module.exports = mongoose.connection;