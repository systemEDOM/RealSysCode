import handlebars from "express-handlebars";
import Handlebars from 'handlebars'
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access'

const path = __dirname + '/../../views/';

const hbs = handlebars({
    defaultLayout: "app",
    extname: "hbs",
    layoutsDir: path + "layouts/",
    partialsDir: path + "common/",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});

module.exports = hbs;