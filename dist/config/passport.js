"use strict";

var _passportLocal = _interopRequireWildcard(require("passport-local"));

var _passport = _interopRequireDefault(require("passport"));

var _user = _interopRequireDefault(require("../schema/user.schema"));

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_passport.default.use(new _passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  await _UserRepository.default.findOne(email).then(async user => {
    if (!user) {
      return done(null, false, {
        message: 'Not user found'
      });
    } else {
      const match = await user.matchPassword(password);

      if (match) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'Incorrect credentials'
        });
      }
    }
  });
}));

_passport.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport.default.deserializeUser(async function (id, done) {
  await _UserRepository.default.findById(id).then((user, err) => {
    done(err, user);
  });
});
//# sourceMappingURL=passport.js.map