import Snippet from '../schema/snippet.schema';
import UserRepository from './UserRepository';
import User from '../schema/user.schema';


class SnippetRepository {

    constructor(model) {
        this.model = model;
    }

    async create(snippetObject) {
        const snippet = await this.model.create(snippetObject)
        await UserRepository.findOneAndUpdate({ _id: snippetObject.user }, {$push: {snippets: snippet._id}}, { new: true });
        return snippet;
    }

    async findOneAndUpdate(_id, snippetObject) {
        return await this.model.findOneAndUpdate({ _id }, snippetObject);
    }

    async findBySlug(slug) {
        return await this.model.findOne({ slug });
    }

    async findById(id, callback) {
        return await this.model.findById(id);
    }
}

export default new SnippetRepository(Snippet);