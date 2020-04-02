"use strict";

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _allowPrototypeAccess = require("@handlebars/allow-prototype-access");

var _expressHandlebarsSections = _interopRequireDefault(require("express-handlebars-sections"));

var _handlebarsHelpers = _interopRequireDefault(require("handlebars-helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = __dirname + '/../../views/';
const hbs = (0, _expressHandlebars.default)({
  defaultLayout: "app",
  extname: "hbs",
  layoutsDir: path + "layouts/",
  partialsDir: path + "common/",
  handlebars: (0, _allowPrototypeAccess.allowInsecurePrototypeAccess)(_handlebars.default),
  section: (0, _expressHandlebarsSections.default)(),
  helpers: { ...(0, _handlebarsHelpers.default)(),
    compare: function (lvalue, operator, rvalue, options) {
      var operators, result;

      if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
      }

      if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
      }

      operators = {
        '==': function (l, r) {
          return l == r;
        },
        '===': function (l, r) {
          return l === r;
        },
        '!=': function (l, r) {
          return l != r;
        },
        '!==': function (l, r) {
          return l !== r;
        },
        '<': function (l, r) {
          return l < r;
        },
        '>': function (l, r) {
          return l > r;
        },
        '<=': function (l, r) {
          return l <= r;
        },
        '>=': function (l, r) {
          return l >= r;
        },
        'typeof': function (l, r) {
          return typeof l == r;
        }
      };

      if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
      }

      result = operators[operator](lvalue, rvalue);

      if (result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    section: function (name, options) {
      if (!this._sections) {
        this._sections = {};
      }

      ;
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});
module.exports = hbs;
//# sourceMappingURL=handlebars.js.map