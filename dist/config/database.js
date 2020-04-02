"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//let env = process.env.NODE_ENV || 'development';
//let config = require('./mongo')[env];

/*let envUrl = process.env[config.use_env_variable];
let localUrl = `"mongodb://${config.host}:27017/${config.database}`;

let mongoUrl = envUrl ? envUrl : localUrl;*/
console.log(process.env.MONGODB_URI);

_mongoose.default.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

_mongoose.default.connection.on('error', console.error.bind(console, 'connection error:'));

_mongoose.default.connection.once('open', () => console.log("Connected to MongoDB database"));

module.exports = _mongoose.default.connection;
//# sourceMappingURL=database.js.map