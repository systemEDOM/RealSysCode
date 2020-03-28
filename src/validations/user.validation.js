import { check } from 'express-validator';
import User from '../schema/user.schema';

export default [
    check('name').not().isEmpty().withMessage('Name must not be empty'),
    check('email').isEmail().withMessage('E-mail must be an email'),
    check('email').not().isEmpty().withMessage('E-mail must not be empty'),
    check('email').custom( value => {
        var query = User.find({ email: value})
        return query.exec().then(user => {
            if (user.length > 0) return Promise.reject('E-mail already in use');
        });
    }),
    check('username').custom( value => {
        var query = User.find({ username: value})
        return query.exec().then(user => {
            if (user.length > 0) return Promise.reject('Username already in use');
        });
    }),
    check('username').not().isEmpty().withMessage('Username must not be empty'),
    check('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters')
];