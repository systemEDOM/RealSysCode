const sinon = require('sinon');
const chai = require('chai');
const bcrypt = require('bcrypt');

const SnippetController = require('../../src/controllers/snippet.controller');
const SnippetSchema = require('../../src/schema/snippet.schema');
const UserSchema = require('../../src/schema/user.schema');

chai.use(require('sinon-chai'));


let res = {};
let expectedResult = {
    _id: "5e850520e836572a5c565c89",
    title: "Snippet sample",
    slug: "snippet-sample",
    language: "java",
    short_description: "short desc",
    user: "5e8162a523d400063422a89f",
    password: bcrypt.hashSync("123456", 10),
};

let req = {
    user: {
        _id: "5e8162a523d400063422a89f",
        slug: "test-user",
    },
    body: {
        title: "Snippet sample",
        language: "java",
        password: "123456",
        short_description: "short desc",
        user: "5e8162a523d400063422a89f",
    },
    params: {
        _id: "5e8162a523d400063422a89f",
        id: "5e8162a523d400063422a89f",
        slug: "snippet-sample",
    },
    flash: sinon.spy(),
    header: sinon.spy(),
};

describe('Snippet Controllers tests', () => {
    before(function () {
        res = {
            status: sinon.stub().returns({ redirect: sinon.spy(), json: sinon.spy() }),
            render: sinon.spy(),
        };
    });

    afterEach(function () {
        sinon.restore();
    });

    it('Store - should be calling SnippetSchema.create with correct data and redirect to /snippets/slug with status 200', async () => {
        sinon.stub(SnippetSchema, 'create').returns(expectedResult);
        sinon.stub(UserSchema, 'findOneAndUpdate').returns(expectedResult);
        await SnippetController.store(req, res);

        chai.expect(SnippetSchema.create).to.have.been.calledWith({
            title: "Snippet sample",
            language: "java",
            password: "123456",
            short_description: "short desc",
            user: "5e8162a523d400063422a89f"
        });
        chai.expect(UserSchema.findOneAndUpdate).to.have.been.calledWith({ _id: { _id: req.body.user } }, { $push: { snippets: expectedResult._id } });
        chai.expect(res.status).to.have.been.calledWith(200);
        chai.expect(res.status().redirect).to.have.been.calledWith(`/snippets/${expectedResult.slug}`);
    });

    it('Store - should be calling SnippetSchema.create and should be returning and error so on calling status(400) and redirect to /snippets/create', async () => {
        sinon.stub(SnippetSchema, 'create').yields(new Error({ error: 'An error has ocurred' }));
        sinon.stub(UserSchema, 'findOneAndUpdate').returns(expectedResult);
        await SnippetController.store(req, res);

        chai.expect(res.status).to.have.been.calledWith(400);
        chai.expect(res.status().redirect).to.have.been.calledWith('/snippets/create');
    });

    it('UpdateByAjax - should be calling SnippetSchema.findOneAndUpdate with correct data and response a json with status 200', async () => {
        sinon.stub(SnippetSchema, 'findOneAndUpdate').returns(expectedResult);
        await SnippetController.updateByAjax(req, res);

        chai.expect(SnippetSchema.findOneAndUpdate).to.have.been.calledWith({ _id: req.params._id }, {
            title: "Snippet sample",
            language: "java",
            password: "123456",
            short_description: "short desc",
            user: "5e8162a523d400063422a89f"
        });
        chai.expect(res.status).to.have.been.calledWith(200);
        chai.expect(res.status().json).to.have.been.calledWith({ message: "Saved successfully" });
    });

    it('UpdateByAjax - should be calling SnippetSchema.findOneAndUpdate with wrong data and response a json with status 400', async () => {
        sinon.stub(SnippetSchema, 'findOneAndUpdate').yields(new Error({ error: 'An error has ocurred' }));
        await SnippetController.updateByAjax(req, res);

        chai.expect(SnippetSchema.findOneAndUpdate).to.have.been.calledWith({ _id: req.params._id }, {
            title: "Snippet sample",
            language: "java",
            password: "123456",
            short_description: "short desc",
            user: "5e8162a523d400063422a89f"
        });
        chai.expect(res.status).to.have.been.calledWith(400);
        chai.expect(res.status().json).to.have.been.calledWith({ message: "An error has occured" });
    });

    it('Delete - should be calling SnippetSchema.remove and redirect back with status 200', async () => {
        sinon.stub(SnippetSchema, 'remove').returns(expectedResult);
        await SnippetController.delete(req, res);

        chai.expect(SnippetSchema.remove).to.have.been.calledWith({ _id: req.params._id });
        chai.expect(res.status).to.have.been.calledWith(200);
        chai.expect(req.header).to.have.been.calledWith("Referer");
    });

    it('Delete - should be calling SnippetSchema.remove and redirect back with status 400', async () => {
        sinon.stub(SnippetSchema, 'remove').yields(new Error({ error: 'An error has ocurred' }));
        await SnippetController.delete(req, res);

        chai.expect(SnippetSchema.remove).to.have.been.calledWith({ _id: req.params._id });
        chai.expect(res.status).to.have.been.calledWith(400);
        chai.expect(req.header).to.have.been.calledWith("Referer");
    });

});
