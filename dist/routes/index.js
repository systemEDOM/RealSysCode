"use strict";

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./user.route"));

var _snippet = _interopRequireDefault(require("./snippet.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', (req, res) => res.render("home"));
router.use('/users', _user.default);
router.use('/snippets', _snippet.default);
module.exports = router;
//# sourceMappingURL=index.js.map