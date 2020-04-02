if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

import express from "express";
import bodyParser from "body-parser";
const db = require("./config/database");
import hbs from "./config/handlebars";
import routes from './routes/index';
import flash from 'connect-flash';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import configPassport from './config/passport';
import passportSocketIo from 'passport.socketio';

const MongoStore = require('connect-mongo')(session);
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

var mongoStore = new MongoStore({
    mongooseConnection: db,
});

require('./realtime/editor')(io, passportSocketIo, passport, cookieParser, mongoStore);

app.use(express.static(__dirname + "/../public/"));

app.engine("hbs", hbs);
app.set("view engine", "hbs");

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


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});