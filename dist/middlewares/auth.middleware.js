"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

let isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/users/login');
};

var _default = isAuthenticated;
exports.default = _default;
//# sourceMappingURL=auth.middleware.js.map