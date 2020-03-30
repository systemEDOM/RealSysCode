import express from "express";
import UserController from "../controllers/user.controller";
import UserValidation from '../validations/user.validation';
import UserUpdateValidation from '../validations/user_update.validations';
import UserVerifyPasswordValidation from '../validations/user_verify_password_validation';
import passport from 'passport';

const router = express.Router();

router.get("/register", UserController.register);
router.post("/store", UserValidation, UserController.store);
router.get("/login", UserController.login);
router.post("/authenticate", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
}));
router.get('/profile/:username', UserController.profile)
router.put('/update', UserUpdateValidation, UserController.update)
router.put('/update/password', UserVerifyPasswordValidation, UserController.updatePassword)
router.get("/logout", UserController.logout);

module.exports = router;