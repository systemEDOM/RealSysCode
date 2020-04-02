"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect("mongodb://localhost:27017/realsyscode_db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

_mongoose.default.connection.on('error', console.error.bind(console, 'connection error:'));

_mongoose.default.connection.once('open', () => console.log("Connected to MongoDB database"));

module.exports = _mongoose.default.connection;
//# sourceMappingURL=database.js.map