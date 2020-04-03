const sinon = require('sinon');
const chai = require('chai');
const bcrypt = require('bcrypt');

const UserController = require('../../src/controllers/user.controller');
const UserRepository = require('../../src/repositories/UserRepository');
const UserSchema = require('../../src/schema/user.schema');

chai.use(require('sinon-chai'));


let res = {};
let expectedResult = {
    _id: "5e8162a523d400063422a89f",
    name: "Test Name",
    username: "test user",
    slugUsername: "test-user",
    email: "test@test.com",
    password: bcrypt.hashSync("test", 10),
};

let req = {
    user: {
        _id: "5e8162a523d400063422a89f",
        slugUsername: "test-user",
    },
    body: {
        name: "Test Name",
        username: "test user",
        email: "test@test.com",
        password: "test",
    },
    params: {
        username: "test-user",
    },
    flash: sinon.spy()
};

describe('User Controllers tests', () => {
    before(function () {
        res = {
            status: sinon.stub().returns({ redirect: sinon.spy() }),
            render: sinon.spy(),
        };
    });

    afterEach(function () {
        sinon.restore();
    });

    it('Store - should be calling UserSchema.create with correct data and redirect to /users/login at least one time', async () => {
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

    it('Store - should be calling UserSchema.create and should be returning and error so on calling status(400) and redirect to /users/register', async () => {
        sinon.stub(UserSchema, 'create').yields(new Error({ error: 'An error has ocurred' }));
        await UserController.store(req, res);

        chai.expect(res.status).to.have.been.calledWith(400);
        chai.expect(res.status().redirect).to.have.been.calledWith('/users/register');
    });

    it('Profile - should be calling UserSchema.findOne and rendering profile', async () => {
        sinon.stub(UserSchema, 'findOne').returns(expectedResult);
        sinon.stub(UserSchema, 'findById').returns(expectedResult);
        await UserController.profile(req, res);

        chai.expect(UserSchema.findOne).to.have.been.calledWith({ slugUsername: expectedResult.slugUsername });
        chai.expect(UserSchema.findById).to.have.been.calledWith(expectedResult._id);
        chai.expect(res.render).to.have.been.calledWith("profile");
    });

    it('Profile - should be calling UserSchema.findOne with wrong username and rendering 404 not found', async () => {
        sinon.stub(UserSchema, 'findOne').returns(null);
        sinon.stub(UserSchema, 'findById').returns(null);
        
        await UserController.profile(req, res);

        chai.expect(UserSchema.findOne).to.have.been.calledWith({ slugUsername: expectedResult.slugUsername });
        chai.expect(req.flash).to.have.been.calledWith("errorNotFound");
        chai.expect(res.render).to.have.been.calledWith("404");
    });

    it('Update - should be calling UserSchema.updateOne and redirect to user profile with status 200', async () => {
        sinon.stub(UserSchema, 'updateOne').returns(expectedResult);
        sinon.stub(UserSchema, 'findById').returns(expectedResult);
        
        await UserController.update(req, res);

        chai.expect(UserSchema.updateOne).to.have.been.calledWith({ _id: req.user._id }, {
            name: "Test Name",
            username: "test user",
            email: "test@test.com",
            password: "test",
        });
        chai.expect(res.status).to.have.been.calledWith(200);
        chai.expect(res.status().redirect).to.have.been.calledWith(`/users/profile/${expectedResult.slugUsername}`);
    });

    it('Update - should be calling UserSchema.updateOne and redirect to user profile with status 400 and flash error', async () => {
        sinon.stub(UserSchema, 'updateOne').returns(expectedResult);
        sinon.stub(UserSchema, 'findById').returns(expectedResult);
        
        await UserController.update(req, res);

        chai.expect(UserSchema.updateOne).to.have.been.calledWith({ _id: req.user._id }, {
            name: "Test Name",
            username: "test user",
            email: "test@test.com",
            password: "test",
        });
        chai.expect(res.status).to.have.been.calledWith(400);
        chai.expect(req.flash).to.have.been.calledWith("error");
        chai.expect(res.status().redirect).to.have.been.calledWith(`/users/profile/${expectedResult.slugUsername}`);
    });

    it('UpdatePassword - should be calling UserSchema.updateOne and redirect to user profile with status 200', async () => {
        sinon.stub(UserSchema, 'updateOne').returns(expectedResult);
        
        await UserController.updatePassword(req, res);

        chai.expect(UserSchema.updateOne).to.have.been.calledWith({ _id: req.user._id }, { $set: { password: req.body.password } });
        chai.expect(res.status).to.have.been.calledWith(200);
        chai.expect(res.status().redirect).to.have.been.calledWith(`/users/profile/${expectedResult.slugUsername}`);
    });

    it('UpdatePassword - should be calling UserSchema.updateOne and redirect to user profile with status 400 and flash error', async () => {
        sinon.stub(UserSchema, 'updateOne').returns(expectedResult);
        
        await UserController.updatePassword(req, res);

        chai.expect(UserSchema.updateOne).to.have.been.calledWith({ _id: req.user._id }, { $set: { password: req.body.password } });
        chai.expect(res.status).to.have.been.calledWith(400);
        chai.expect(req.flash).to.have.been.calledWith("error");
        chai.expect(res.status().redirect).to.have.been.calledWith(`/users/profile/${expectedResult.slugUsername}`);
    });
});
