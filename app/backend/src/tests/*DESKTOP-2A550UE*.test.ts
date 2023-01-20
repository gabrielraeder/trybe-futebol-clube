import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import User from '../database/models/User.model';
import { userSuccessMock } from './mocks/user.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginInfo = {
  email: 'mock@mock.com',
  password: 'secret_admin',
}

describe('-> POST /login', () => {
  let chaiHttpResponse: Response;
  // before(async () => {
  //   sinon.stub(User, 'findOne').resolves(userSuccessMock as User)
  // })

  afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
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

  it('Requisição com EMAIL incorreto', async () => {
    sinon.stub(User, 'findOne').resolves();
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginInfo);
      
    expect(chaiHttpResponse.status).to.equal(401);
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