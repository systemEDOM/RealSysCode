"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongooseUrlSlugs = _interopRequireDefault(require("mongoose-url-slugs"));

var _slugify = _interopRequireDefault(require("slugify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
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
    max: 50
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
  snippets: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Snippet'
  }]
}, {
  timestamps: true
});
UserSchema.pre('save', async function (next) {
  this.password = await _bcrypt.default.hash(this.password, 10);
  next();
});
UserSchema.pre('updateOne', async function (next) {
  if (this._update.$set.password) this.set({
    password: await _bcrypt.default.hash(this._update.$set.password, 10)
  });
  if (this._update.username) this.set({
    slugUsername: (0, _slugify.default)(this._update.username)
  });
  next();
});
UserSchema.methods = {
  matchPassword: async function (password) {
    return await _bcrypt.default.compare(password, this.password);
  }
};
UserSchema.plugin((0, _mongooseUrlSlugs.default)('username', {
  field: 'slugUsername',
  update: true,
  alwaysRecreate: true
}));
module.exports = _mongoose.default.model("User", UserSchema);
//# sourceMappingURL=user.schema.js.map