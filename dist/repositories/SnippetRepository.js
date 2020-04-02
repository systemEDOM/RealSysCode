"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _snippet = _interopRequireDefault(require("../schema/snippet.schema"));

var _UserRepository = _interopRequireDefault(require("./UserRepository"));

var _user = _interopRequireDefault(require("../schema/user.schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SnippetRepository {
  constructor(model) {
    this.model = model;
  }

  async create(snippetObject) {
    const snippet = await this.model.create(snippetObject);
    await _UserRepository.default.findOneAndUpdate({
      _id: snippetObject.user
    }, {
      $push: {
        snippets: snippet._id
      }
    }, {
      new: true
    });
    return snippet;
  }

  async findOneAndUpdate(_id, snippetObject) {
    return await this.model.findOneAndUpdate({
      _id
    }, snippetObject);
  }

  async findBySlug(slug) {
    return await this.model.findOne({
      slug
    });
  }

  async findById(id, callback) {
    return await this.model.findById(id);
  }

}

var _default = new SnippetRepository(_snippet.default);

exports.default = _default;
//# sourceMappingURL=SnippetRepository.js.map