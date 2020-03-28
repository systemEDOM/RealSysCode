import express from "express";
import bodyParser from "body-parser";
import db from "./config/database";
import hbs from "./config/handlebars";
import routes from './routes/index';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';


const app = express();

app.use(express.static(__dirname + "/../public/"));

app.engine("hbs", hbs);
app.set("view engine", "hbs");

app.use(cookieParser('secret123'));
app.use(session({ secrt: 'secret123', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } }));
app.use(flash());
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port: http://localhost:${port}`);
});