import express from "express";
import UserController from "../controllers/user.controller.js";
import userValidation from '../validations/user.validation';

const router = express.Router();

router.get("/register", UserController.register);
router.post("/store", userValidation, UserController.store);
router.get("/login", UserController.login);

module.exports = router;