import express from "express";
import user_routes from './user.route';
import snippet_routes from './snippet.route';

const router = express.Router();

router.get('/', (req, res) => res.render("home"));
router.use('/users', user_routes);
router.use('/snippets', snippet_routes);

module.exports = router;