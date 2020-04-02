"use strict";

var _SnippetRepository = _interopRequireDefault(require("../repositories/SnippetRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  validationResult
} = require('express-validator');

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
    await _SnippetRepository.default.create(req.body).then(newSnippet => {
      req.flash('success', "Snippet created successfully. Now write your code!");
      res.status(200).redirect(`/snippets/${newSnippet.slug}`);
    }).catch(error => {
      console.log(error);
      req.flash('error', "An error has occured");
      res.status(400).redirect("/snippets/create");
    });
  },
  updateByAjax: async (req, res) => {
    await _SnippetRepository.default.findOneAndUpdate(req.params.id, req.body).then(newSnippet => {
      res.status(200).json({
        message: "Saved successfully"
      });
    }).catch(error => {
      console.log(error);
      res.status(400).json({
        message: "An error has occured"
      });
    });
  },
  show: async (req, res) => {
    const snippet = await _SnippetRepository.default.findBySlug(req.params.slug);
    res.render('snippets/show_snippet', {
      snippet
    });
  }
};
module.exports = UserController;
//# sourceMappingURL=snippet.controller.js.map