import express from "express";
import bodyParser from "body-parser";
import db from "./config/database";
import hb from "./config/handlebars";
import routes from './routes/index';

const app = express();

app.engine("hb", hb);
app.set("view engine","hb");

app.use('/css', express.static(__dirname + '/views/static/css'));
app.use('/js', express.static(__dirname + '/views/static/js'));
app.use('/imgs', express.static(__dirname + '/views/static/img'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);
app.use('/', (req, res) => res.render('home'));

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port: http://localhost:${port}`);
});