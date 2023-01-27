import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model';
import { jwtVerifiedMock, mockedToken, userSuccessMock } from './mocks/user.mocks';
import * as auth from '../auth/jwtFunctions';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginInfo = {
  email: 'mock@mock.com',
  password: 'secret_admin',
}

describe('-> POST /login', () => {
  let chaiHttpResponse: Response;
  afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
      sinon.restore()
    })

  it('Without password', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User)
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: loginInfo.email });
      
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('Without email', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User)
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: loginInfo.password });
      
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('With invalid password', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User);
    sinon.stub(bcrypt, 'compareSync').returns(false);
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...loginInfo, password: 'errado'});
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('With invalid email', async () => {
    sinon.stub(User, 'findOne').resolves();
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginInfo);
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('Success', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(auth, 'createToken').returns(mockedToken)
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginInfo);
      
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body.token).to.equal(mockedToken);
  });
});

describe('-> GET /login/validate', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
      sinon.restore()
    })

  it('Success', async () => {
    sinon.stub(User, 'findOne').resolves();
    sinon.stub(jwt, 'verify').returns(jwtVerifiedMock as any);
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate').set('Authorization', mockedToken);
      
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body.role).to.equal(jwtVerifiedMock.data.role);
  });

  it('Without token', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User);
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate').set('Authorization', '');
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Token must be a valid token');
  });

  it('Invalid token', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User);
    sinon.stub(auth, 'verifyToken').returns('jwtVerifiedMock');
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate').set('Authorization', 'wrongToken');
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Token must be a valid token');
  });
});
