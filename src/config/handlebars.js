import handlebars from "express-handlebars";

const path = __dirname + '../views/';

const hbs = handlebars({
    defaultLayout: "app",
    extname: "hbs",
    layoutsDir: __dirname + "/../../views/layouts/",
    //partialsDir: path + "common"
});

module.exports = hbs;