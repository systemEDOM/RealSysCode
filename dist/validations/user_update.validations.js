"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

var _user = _interopRequireDefault(require("../schema/user.schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [(0, _expressValidator.check)('name').not().isEmpty().withMessage('Name must not be empty'), (0, _expressValidator.check)('email').isEmail().withMessage('E-mail must be an email'), (0, _expressValidator.check)('email').not().isEmpty().withMessage('E-mail must not be empty'), (0, _expressValidator.check)('email').custom((value, {
  req
}) => {
  var query = _user.default.findOne({
    email: value
  });

  return query.exec().then(userFound => {
    if (userFound && req.user.slugUsername != userFound.slugUsername) return Promise.reject('E-mail already in use');
  });
}), (0, _expressValidator.check)('username').custom((value, {
  req
}) => {
  var query = _user.default.findOne({
    username: value
  });

  return query.exec().then(userFound => {
    if (userFound && req.user.slugUsername != userFound.slugUsername) return Promise.reject('Username already in use');
  });
}), (0, _expressValidator.check)('username').not().isEmpty().withMessage('Username must not be empty')];
exports.default = _default;
//# sourceMappingURL=user_update.validations.js.map