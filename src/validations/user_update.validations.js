import { check, body } from 'express-validator';
import User from '../schema/user.schema';

export default [
    check('name').not().isEmpty().withMessage('Name must not be empty'),
    check('email').isEmail().withMessage('E-mail must be an email'),
    check('email').not().isEmpty().withMessage('E-mail must not be empty'),
    check('email').custom( (value, { req }) => {
        var query = User.findOne({ email: value})
        return query.exec().then(userFound => {
            if (userFound && req.user.slugUsername != userFound.slugUsername) return Promise.reject('E-mail already in use');
        });
    }),
    check('username').custom( (value, { req }) => {
        var query = User.findOne({ username: value})
        return query.exec().then(userFound => {
            if (userFound && req.user.slugUsername != userFound.slugUsername) return Promise.reject('Username already in use');
        });
    }),
    check('username').not().isEmpty().withMessage('Username must not be empty'),
];