import User from '../schema/user.schema';

class UserRepository {

    constructor(model) {
        this.model = model;
    }

    async create(userObject) {
        return await this.model.create(userObject);
    }

    async findOne(email) {
        return await this.model.findOne({ email });
    }

    async findById(id, callback) {
        return await this.model.findById(id);
    }
}

export default new UserRepository(User);