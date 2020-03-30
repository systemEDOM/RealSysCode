import handlebars from "express-handlebars";
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

const path = __dirname + '/../../views/';


const hbs = handlebars({
    defaultLayout: "app",
    extname: "hbs",
    layoutsDir: path + "layouts/",
    partialsDir: path + "common/",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
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
                '==': function (l, r) { return l == r; },
                '===': function (l, r) { return l === r; },
                '!=': function (l, r) { return l != r; },
                '!==': function (l, r) { return l !== r; },
                '<': function (l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l == r; }
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
        
        }
    }
});

module.exports = hbs;