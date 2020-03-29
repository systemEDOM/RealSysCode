import express from "express";
import UserController from "../controllers/user.controller.js";
import userValidation from '../validations/user.validation';
import passport from 'passport';

const router = express.Router();

router.get("/register", UserController.register);
router.post("/store", userValidation, UserController.store);
router.get("/login", UserController.login);
router.post("/authenticate", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
}));
router.get("/logout", UserController.logout);

module.exports = router;