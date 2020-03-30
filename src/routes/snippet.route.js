import express from "express";
import SnippetController from "../controllers/snippet.controller";
//import UserValidation from '../validations/user.validation';
import passport from 'passport';

const router = express.Router();

router.get("/create", SnippetController.create);

module.exports = router;