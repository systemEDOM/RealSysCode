"use strict";

var _express = _interopRequireDefault(require("express"));

var _snippet = _interopRequireDefault(require("../controllers/snippet.controller"));

var _snippet2 = _interopRequireDefault(require("../validations/snippet.validation"));

var _auth = _interopRequireDefault(require("../middlewares/auth.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/create", _auth.default, _snippet.default.create);
router.post("/store", _auth.default, _snippet2.default, _snippet.default.store);
router.get("/:slug", _auth.default, _snippet.default.show);
router.put("/updateByAjax/:id", _auth.default, _snippet.default.updateByAjax);
router.delete("/:id", _auth.default, _snippet.default.delete);
module.exports = router;
//# sourceMappingURL=snippet.route.js.map