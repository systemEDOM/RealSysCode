import SnippetRepository from '../repositories/SnippetRepository';
const { validationResult } = require('express-validator');

const UserController = {
    create: async (req, res) => {
        res.render('snippets/create_snippet');
    },
    store: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errors', errors.array());
            return res.status(400).redirect('/snippets/create');
        }

        req.body.user = req.user._id;
        await SnippetRepository.create(req.body)
            .then(newSnippet => {
                req.flash('success', "Snippet created successfully. Now write your code!");
                res.status(200).redirect(`/snippets/${newSnippet.slug}`);
            }).catch(error => {
                // console.log(error);
                req.flash('error', "An error has occured");
                res.status(400).redirect("/snippets/create");
            });
    },
    updateByAjax: async (req, res) => {
        await SnippetRepository.findOneAndUpdate(req.params.id, req.body)
            .then(newSnippet => {
                res.status(200).json({ message: "Saved successfully" });
            }).catch(error => {
                // console.log(error);
                res.status(400).json({ message: "An error has occured" });
            });
    },
    show: async (req, res) => {
        const snippet = await SnippetRepository.findBySlug(req.params.slug);
        res.render('snippets/show_snippet', { snippet, user: req.user });
    },
    delete: async (req, res) => {
        await SnippetRepository.delete(req.params.id)
            .then(result => {
                req.flash('success', "Snippet deleted successfully!");
                res.status(200).redirect(req.header('Referer'));
            }).catch(error => {
                // console.log(error);
                req.flash('error', "An error has occured");
                res.status(400).redirect(req.header('Referer'));
            });
    },
};

module.exports = UserController;