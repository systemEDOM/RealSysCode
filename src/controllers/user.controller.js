import UserRepository from '../repositories/UserRepository';
const { validationResult } = require('express-validator');

const UserController = {
    store: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors',  errors.array());
            return res.status(400).redirect('/users/register');
        }

        await UserRepository.create(req.body)
            .then(newUser => {
                req.flash('success',  "Account created successfully");
                res.status(200).redirect("/users/login");
            }).catch(error => {
                console.log(error);
                req.flash('errors',  [{msg: "An error has occured"}]);
                res.status(400).redirect("/users/register");
            });
    },
    register: async (req, res) => {
        res.render("register");
    },
    login: async (req, res) => {
        res.render("login");
    },
    logout: async (req, res) => {
        req.logout();
        req.flash("success", "You are logged out now!");
        res.redirect("/users/login");
    }
};

module.exports = UserController;