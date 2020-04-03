"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../schema/user.schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async create(userObject) {
    return await this.model.create(userObject);
  }

  async update(userObject, _id) {
    return await this.model.updateOne({
      _id
    }, userObject);
  }

  async findOneAndUpdate(_id, userObject) {
    return await this.model.findOneAndUpdate({
      _id
    }, userObject);
  }

  async updatePassword(password, _id) {
    return await _user.default.updateOne({
      _id
    }, {
      $set: {
        password
      }
    });
  }

  async snippetsByUser(_id) {
    return await this.model.findById(_id).populate("snippets");
  }

  async findOne(email) {
    return await this.model.findOne({
      email
    });
  }

  async findByUsername(slugUsername) {
    return await this.model.findOne({
      slugUsername
    });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

}

var _default = new UserRepository(_user.default);

exports.default = _default;
//# sourceMappingURL=UserRepository.js.map