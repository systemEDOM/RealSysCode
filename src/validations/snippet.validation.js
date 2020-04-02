import { check } from 'express-validator';
import Snippet from '../schema/snippet.schema';

export default [
    check('short_description').not().isEmpty().withMessage('Short description must not be empty'),
    check('title').not().isEmpty().withMessage('Title must not be empty'),
    check('language').not().isEmpty().withMessage('Language must not be empty'),
    check('title').custom( value => {
        var query = Snippet.find({ title: value})
        return query.exec().then(snippet => {
            if (snippet.length > 0) return Promise.reject('Title already in use');
        });
    }),
];