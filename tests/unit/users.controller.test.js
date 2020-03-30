const sinon = require('sinon');
const chai = require('chai');
const bcrypt = require('bcrypt');

const UserController = require('../src/controllers/user.controller');
const UserRepository = require('../src/repositories/UserRepository');
const UserSchema = require('../src/schema/user.schema');
const UserValidation = require('../src/validations/user.validation');

chai.use(require('sinon-chai'));


let res = {};
let expectedResult = {
    name: "Test Name",
    username: "test-user",
    email: "test@test.com",
    password: bcrypt.hashSync("test", 10),
};

let req = {
    body: {
        name: "Test Name",
        username: "test user",
        email: "test@test.com",
        password: "test",
    },
    params: {},
    flash: sinon.spy()
};

describe('User Controllers tests', () => {
    before(function () {
        res = {
            status: sinon.stub().returns({ redirect: sinon.spy() }),
        };

        sinon.stub(UserSchema, 'create').returns(expectedResult);
    });

    after(function () {
        sinon.restore();
    });

    it('should be calling UserSchema.create with correct data and redirect to login at least one time', async () => {
        await UserController.store(req, res);

        chai.expect(UserSchema.create).to.have.been.calledWith({
            name: "Test Name",
            username: "test user",
            email: "test@test.com",
            password: "test",
        });
        chai.expect(res.status).to.have.been.calledWith(200).callCount(1);
        chai.expect(res.status().redirect).to.have.been.calledWith('/users/login').callCount(1);
    });
});
