import { check, body } from 'express-validator';
import User from '../schema/user.schema';

export default [
    check('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),
    check('old_password').custom( async (value, { req }) => {
        var query = User.findById(req.user._id)
        return query.then( async userFound => {
            const match = await userFound.matchPassword(value);
            if (!match) return Promise.reject("Your old password doesn't match");
        });
    }),
    check('old_password').isLength({ min: 4 }).withMessage('Old Password must be at least 4 characters'),
];