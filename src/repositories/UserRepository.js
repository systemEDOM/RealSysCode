import User from '../schema/user.schema';

class UserRepository {

    constructor(model) {
        this.model = model;
    }

    async create(userObject) {
        return await this.model.create(userObject);
    }

    async update(userObject, _id) {
        return await this.model.updateOne({ _id }, userObject);
    }

    async updatePassword(password, _id) {
        return await User.updateOne({ _id }, { $set: { password } });
    }

    async findOne(email) {
        return await this.model.findOne({ email });
    }

    async findByUsername(slugUsername) {
        return await this.model.findOne({ slugUsername });
    }

    async findById(id) {
        return await this.model.findById(id);
    }
}

export default new UserRepository(User);