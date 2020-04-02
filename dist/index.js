"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _database = _interopRequireDefault(require("./config/database"));

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

const MongoStore = require('connect-mongo')(_expressSession.default);

const app = (0, _express.default)();

const server = require('http').Server(app);

const io = require('socket.io')(server);

app.use(_express.default.static(__dirname + "/../public/"));
app.engine("hbs", _handlebars.default);
app.set("view engine", "hbs");
var mongoStore = new MongoStore({
  mongooseConnection: _database.default
});
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
let sockets = {};
let usersByRoom = {};
io.use(_passport3.default.authorize({
  key: 'connect.sid',
  secret: "secret123",
  passport: _passport.default,
  cookieParser: _cookieParser.default,
  store: mongoStore
}));
io.on('connection', function (socket) {
  let currRoom = socket.request._query.snippetID;

  if (!sockets[socket.request.user._id]) {
    console.log("Client connected");
    socket.room = currRoom;
    sockets[socket.request.user._id] = socket;
  } //socket.join(currRoom);
  //console.log(io.sockets.adapter.rooms[currRoom], currRoom);
  //socket.to(currRoom).emit('joined', { users: usersByRoom });


  socket.on('create', function (room) {
    socket.join(room);
    Object.keys(io.sockets.adapter.rooms[currRoom].sockets).forEach(sock => {
      let userByRoom = io.sockets.connected[sock].request.user;
      usersByRoom[userByRoom._id] = userByRoom;
    });
    console.log(usersByRoom);
    console.log("emiting...", room);
    io.in(room).emit('joined', {
      users: usersByRoom
    });
  });
  socket.on('code_emit', function (eventData) {
    if (socket.request.user && sockets[socket.request.user._id]) {
      console.log(eventData.id);
      socket.broadcast.to(eventData.id).emit("get_code_emit", eventData.value);
    }
  });
  socket.on('disconnect', function (eventData) {
    console.log("disconnected");
    Object.keys(sockets).forEach(userId => {
      let sock = sockets[userId];

      if (sock.id == socket.id) {
        sockets[userId] = null;
      }
    });
  });
});
const port = process.env.port || 3000;
server.listen(port, () => {
  console.log(`Server is up and running on port: http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map