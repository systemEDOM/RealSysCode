"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

var _user = _interopRequireDefault(require("../schema/user.schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [(0, _expressValidator.check)('name').not().isEmpty().withMessage('Name must not be empty'), (0, _expressValidator.check)('email').isEmail().withMessage('E-mail must be an email'), (0, _expressValidator.check)('email').not().isEmpty().withMessage('E-mail must not be empty'), (0, _expressValidator.check)('email').custom(value => {
  var query = _user.default.find({
    email: value
  });

  return query.exec().then(user => {
    if (user.length > 0) return Promise.reject('E-mail already in use');
  });
}), (0, _expressValidator.check)('username').custom(value => {
  var query = _user.default.find({
    username: value
  });

  return query.exec().then(user => {
    if (user.length > 0) return Promise.reject('Username already in use');
  });
}), (0, _expressValidator.check)('username').not().isEmpty().withMessage('Username must not be empty'), (0, _expressValidator.check)('password').isLength({
  min: 4
}).withMessage('Password must be at least 4 characters')];
exports.default = _default;
//# sourceMappingURL=user.validation.js.map