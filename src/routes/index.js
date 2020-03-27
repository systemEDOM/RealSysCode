import express from "express";
import user_routes from './user.route';

const router = express.Router();


router.use('/users', user_routes);

module.exports = router;