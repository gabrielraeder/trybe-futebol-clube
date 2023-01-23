import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
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

  it('Requisição sem PASSWORD', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User)
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: loginInfo.email });
      
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('Requisição sem EMAIL', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User)
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: loginInfo.password });
      
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('Requisição com PASSWORD incorreto', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User);
    sinon.stub(bcrypt, 'compareSync').returns(false);
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...loginInfo, password: 'errado'});
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('Requisição com EMAIL incorreto', async () => {
    sinon.stub(User, 'findOne').resolves();
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginInfo);
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('Requisição com SUCESSO', async () => {
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
  // before(async () => {
  //   sinon.stub(User, 'findOne').resolves(userSuccessMock as User)
  // })

  afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
      sinon.restore()
    })

  it('Requisição com SUCESSO', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User);
    sinon.stub(auth, 'verifyToken').returns(jwtVerifiedMock);
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate').set('Authorization', mockedToken);
      
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body.role).to.equal(userSuccessMock.dataValues.role);
  });

  it('Requisição sem TOKEN', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User);
    // sinon.stub(auth, 'verifyToken').returns(jwtVerifiedMock);
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate').set('Authorization', '');
      
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('Token not found');
  });

  it('Requisição com TOKEN INVALIDO', async () => {
    sinon.stub(User, 'findOne').resolves(userSuccessMock as User);
    sinon.stub(auth, 'verifyToken').returns('jwtVerifiedMock');
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate').set('Authorization', 'wrongToken');
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Invalid Token');
  });

  it('Requisição com TOKEN VALIDO, sem encontrar usuario', async () => {
    sinon.stub(User, 'findOne').resolves();
    sinon.stub(auth, 'verifyToken').returns(jwtVerifiedMock);
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate').set('Authorization', mockedToken);
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('user not found');
  });
});

  


  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });