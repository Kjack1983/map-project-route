import chai from 'chai';
const { expect } = chai;
const should = chai.should();
import app from '../app';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('Users test', () => {
    it('test index msg', (done) => {
        chai.request(app)
        .get('/users')
        .end((err, res) => {
            if(err) done(err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            let { body: { message } } = res;
            expect(message).to.be.a('string');
            const actual = message;
            expect(actual).to.be.equal('No users at the moment!');
            done();
        })
    });
});