"use strict";

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongooseUrlSlugs = _interopRequireDefault(require("mongoose-url-slugs"));

var _slugify = _interopRequireDefault(require("slugify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Schema = _mongoose.default.Schema;
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
    max: 200
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
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
SnippetSchema.pre('save', async function (next) {
  if (this.password) this.password = await _bcrypt.default.hash(this.password, 10);
  next();
});
SnippetSchema.pre('updateOne', async function (next) {
  if (this._update.$set.password) this.set({
    password: await _bcrypt.default.hash(this._update.$set.password, 10)
  });
  if (this._update.title) this.set({
    slug: (0, _slugify.default)(this._update.title)
  });
  next();
});
SnippetSchema.methods = {
  matchPassword: async function (password) {
    return await _bcrypt.default.compare(password, this.password);
  }
};
SnippetSchema.plugin((0, _mongooseUrlSlugs.default)('title', {
  field: 'slug'
}));
module.exports = _mongoose.default.model("Snippet", SnippetSchema);
//# sourceMappingURL=snippet.schema.js.map