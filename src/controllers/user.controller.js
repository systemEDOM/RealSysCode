import UserRepository from '../repositories/UserRepository';
const { validationResult } = require('express-validator');

const UserController = {
    store: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors', errors.array());
            return res.status(400).redirect('/users/register');
        }

        await UserRepository.create(req.body)
            .then(newUser => {
                req.flash('success', "Account created successfully");
                res.status(200).redirect("/users/login");
            }).catch(error => {
                req.flash('error', "An error has occured");
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
    },
    profile: async (req, res) => {
        await UserRepository.findByUsername(req.params.username).then( async userFound => {
            if (userFound === null) {
                req.flash("errorNotFound", "An error has ocurred may be the user doesn't exist");
                res.render('profile');
            } else {
                const snippetsByUser = await UserRepository.snippetsByUser(userFound._id);
                res.render('profile', { userFound, snippetsByUser });
            }
        }).catch(error => {
            res.render('profile', { error: "An error has ocurred may be the user doesn't exist" });
        });
    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors', errors.array());
            return res.status(400).redirect(`/users/profile/${req.user.slugUsername}`);
        }

        await UserRepository.update(req.body, req.user._id)
            .then(async newUser => {
                const user = await UserRepository.findById(req.user._id);
                req.flash('success', "Account updated successfully");
                res.status(200).redirect(`/users/profile/${user.slugUsername}`);
            }).catch(error => {
                req.flash('error', "An error has occured");
                res.status(400).redirect(`/users/profile/${req.user.slugUsername}`);
            });
    },
    updatePassword: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors', errors.array());
            return res.status(400).redirect(`/users/profile/${req.user.slugUsername}`);
        }

        await UserRepository.updatePassword(req.body.password, req.user._id)
            .then(newUser => {
                req.flash('success', "Password updated successfully");
                res.status(200).redirect(`/users/profile/${req.user.slugUsername}`);
            }).catch(error => {
                console.log(error);
                req.flash('error', "An error has occured");
                res.status(400).redirect(`/users/profile/${req.user.slugUsername}`);
            });
    }
};

module.exports = UserController;