"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

var _user = _interopRequireDefault(require("../schema/user.schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [(0, _expressValidator.check)('password').isLength({
  min: 4
}).withMessage('Password must be at least 4 characters'), (0, _expressValidator.check)('old_password').custom(async (value, {
  req
}) => {
  var query = _user.default.findById(req.user._id);

  return query.then(async userFound => {
    const match = await userFound.matchPassword(value);
    if (!match) return Promise.reject("Your old password doesn't match");
  });
}), (0, _expressValidator.check)('old_password').isLength({
  min: 4
}).withMessage('Old Password must be at least 4 characters')];
exports.default = _default;
//# sourceMappingURL=user_verify_password_validation.js.map