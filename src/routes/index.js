import express from "express";
import user_routes from './user.route';

const router = express.Router();

router.get('/', (req, res) => res.render("home"));
router.use('/users', user_routes);

module.exports = router;