import express from "express";
import bodyParser from "body-parser";
import db from "./config/database";
import hbs from "./config/handlebars";
import routes from './routes/index';
import flash from 'connect-flash';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import configPassport from './config/passport';
import passportSocketIo from 'passport.socketio';

require('dotenv').config()

const MongoStore = require('connect-mongo')(session);
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + "/../public/"));

app.engine("hbs", hbs);
app.set("view engine", "hbs");

var mongoStore = new MongoStore({
    mongooseConnection: db,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser('secret123'));
app.use(session({ secret: 'secret123', resave: true, saveUninitialized: true, store: mongoStore }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.message = req.flash();
    res.locals.user = req.user || null;
    next();
});
app.use(routes);

let sockets = {};
let usersByRoom = {};
io.use(passportSocketIo.authorize({
    key: 'connect.sid',
    secret: "secret123",
    passport: passport,
    cookieParser: cookieParser,
    store: mongoStore,
}));
io.on('connection', function (socket) {
    let currRoom = socket.request._query.snippetID;
    if (!sockets[socket.request.user._id]) {
        console.log("Client connected");
        socket.room = currRoom;
        sockets[socket.request.user._id] = socket;
    }

    //socket.join(currRoom);


    //console.log(io.sockets.adapter.rooms[currRoom], currRoom);
    
    
    //socket.to(currRoom).emit('joined', { users: usersByRoom });

    socket.on('create', function (room) {
        socket.join(room);
        Object.keys(io.sockets.adapter.rooms[currRoom].sockets).forEach( sock => {
            let userByRoom = io.sockets.connected[sock].request.user;
            usersByRoom[userByRoom._id] = userByRoom;
        });
        console.log(usersByRoom);
        console.log("emiting...", room);
        
        io.in(room).emit('joined', { users: usersByRoom });
    });


    socket.on('code_emit', function (eventData) {
        if (socket.request.user && sockets[socket.request.user._id]) {
            console.log(eventData.id);
            socket.broadcast.to(eventData.id).emit("get_code_emit", eventData.value);
        }
    });

    socket.on('disconnect', function (eventData) {
        console.log("disconnected");
        Object.keys(sockets).forEach( userId => {
            let sock = sockets[userId];
            if (sock.id == socket.id) {
                sockets[userId] = null;
            }
        });
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});