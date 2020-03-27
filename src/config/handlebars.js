import handlebars from "express-handlebars";

const path = __dirname + '/../views/';

const hb = handlebars({
    defaultLayout: "app",
    extname: "hbs",
    layoutsDir: path + "layouts",
    //partialsDir: path + "common"
});

module.exports = hb;