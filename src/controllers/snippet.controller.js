import SnippetRepository from '../repositories/SnippetRepository';
const { validationResult } = require('express-validator');

const UserController = {
    create: async (req, res) => {
        res.render('snippets/create_snippet');
    },
};

module.exports = UserController;