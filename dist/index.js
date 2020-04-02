"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _handlebars = _interopRequireDefault(require("./config/handlebars"));

var _index = _interopRequireDefault(require("./routes/index"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _passport = _interopRequireDefault(require("passport"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _passport2 = _interopRequireDefault(require("./config/passport"));

var _passport3 = _interopRequireDefault(require("passport.socketio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const db = require("./config/database");

const MongoStore = require('connect-mongo')(_expressSession.default);

const app = (0, _express.default)();

const server = require('http').Server(app);

const io = require('socket.io')(server);

var mongoStore = new MongoStore({
  mongooseConnection: db
});

require('./realtime/editor')(io, _passport3.default, _passport.default, _cookieParser.default, mongoStore);

app.use(_express.default.static(__dirname + "/../public/"));
app.engine("hbs", _handlebars.default);
app.set("view engine", "hbs");
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use((0, _methodOverride.default)('_method'));
app.use((0, _cookieParser.default)('secret123'));
app.use((0, _expressSession.default)({
  secret: 'secret123',
  resave: true,
  saveUninitialized: true,
  store: mongoStore
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
app.use((0, _connectFlash.default)());
app.use((req, res, next) => {
  res.locals.message = req.flash();
  res.locals.user = req.user || null;
  next();
});
app.use(_index.default);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
//# sourceMappingURL=index.js.map