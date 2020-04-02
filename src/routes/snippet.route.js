import express from "express";
import SnippetController from "../controllers/snippet.controller";
import SnippetValidation from '../validations/snippet.validation';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get("/create", AuthMiddleware, SnippetController.create);
router.post("/store", AuthMiddleware, SnippetValidation, SnippetController.store);
router.get("/:slug", AuthMiddleware, SnippetController.show);
router.put("/updateByAjax/:id", AuthMiddleware, SnippetController.updateByAjax);

module.exports = router;