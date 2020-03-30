const sinon = require('sinon');
const chai = require('chai');
const bcrypt = require('bcrypt');

const UserController = require('../../src/controllers/user.controller');
const UserRepository = require('../../src/repositories/UserRepository');
const UserSchema = require('../../src/schema/user.schema');

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
    });

    afterEach(function () {
        sinon.restore();
    });

    it('should be calling UserSchema.create with correct data and redirect to /users/login at least one time', async () => {
        sinon.stub(UserSchema, 'create').returns(expectedResult);
        await UserController.store(req, res);

        chai.expect(UserSchema.create).to.have.been.calledWith({
            name: "Test Name",
            username: "test user",
            email: "test@test.com",
            password: "test",
        });
        chai.expect(res.status).to.have.been.calledWith(200);
        chai.expect(res.status().redirect).to.have.been.calledWith('/users/login');
    });

    it('should be calling UserSchema.create and should be returning and error so on calling status(400) and redirect to /users/register', async () => {
        sinon.stub(UserSchema, 'create').yields(new Error({ error: 'An error has ocurred' }));
        await UserController.store(req, res);

        chai.expect(res.status).to.have.been.calledWith(400);
        chai.expect(res.status().redirect).to.have.been.calledWith('/users/register');
    });
});
