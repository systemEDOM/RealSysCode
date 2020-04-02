"use strict";

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _user2 = _interopRequireDefault(require("../validations/user.validation"));

var _user_update = _interopRequireDefault(require("../validations/user_update.validations"));

var _user_verify_password_validation = _interopRequireDefault(require("../validations/user_verify_password_validation"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/register", _user.default.register);
router.post("/store", _user2.default, _user.default.store);
router.get("/login", _user.default.login);
router.post("/authenticate", _passport.default.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true
}));
router.get('/profile/:username', _user.default.profile);
router.put('/update', _user_update.default, _user.default.update);
router.put('/update/password', _user_verify_password_validation.default, _user.default.updatePassword);
router.get("/logout", _user.default.logout);
module.exports = router;
//# sourceMappingURL=user.route.js.map