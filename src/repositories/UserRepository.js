import User from '../schema/user.schema';
import bcryp from 'bcrypt';

class UserRepository {

    constructor(model) {
        this.model = model;
    }

    async create(userObject) {
        userObject.password = await bcryp.hash(userObject.password, 10);
        return this.model.create(userObject);
    }
}

export default new UserRepository(User);