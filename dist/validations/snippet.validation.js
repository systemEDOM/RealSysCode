"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

var _snippet = _interopRequireDefault(require("../schema/snippet.schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [(0, _expressValidator.check)('short_description').not().isEmpty().withMessage('Short description must not be empty'), (0, _expressValidator.check)('title').not().isEmpty().withMessage('Title must not be empty'), (0, _expressValidator.check)('language').not().isEmpty().withMessage('Language must not be empty'), (0, _expressValidator.check)('title').custom(value => {
  var query = _snippet.default.find({
    title: value
  });

  return query.exec().then(snippet => {
    if (snippet.length > 0) return Promise.reject('Title already in use');
  });
})];
exports.default = _default;
//# sourceMappingURL=snippet.validation.js.map