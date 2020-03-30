import Snippet from '../schema/snippet.schema';

class SnippetRepository {

    constructor(model) {
        this.model = model;
    }

    async create(snippetObject) {
        return await this.model.create(snippetObject);
    }

    async findBySlug(slug) {
        return await this.model.findOne({ slug });
    }

    async findById(id, callback) {
        return await this.model.findById(id);
    }
}

export default new SnippetRepository(Snippet);