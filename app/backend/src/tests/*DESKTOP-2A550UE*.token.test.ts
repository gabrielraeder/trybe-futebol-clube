import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { createToken, verifyToken } from '../auth/jwtFunctions';
import { jwtPayload } from './mocks/jwt.mock'
import { jwtVerifiedMock, mockedToken } from './mocks/user.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('-> JWT Functions', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('createToken', async () => {
    sinon.stub(jwt, 'sign').resolves(mockedToken);

    const createdToken = await createToken({ id: 1,
      username: 'mock',
      role:'mock',
      email: 'mock@mock.com'})
    expect(createdToken).to.equal(mockedToken);
  })

  it('verifyToken with Success', async () => {
    sinon.stub(jwt, 'verify').resolves(jwtVerifiedMock);

    const verified = await verifyToken(mockedToken)
    expect(verified).to.equal(jwtVerifiedMock);
  });

  it('verifyToken with Failure', async () => {
    const error = 'error'
    sinon.stub(jwt, 'verify').throws(new Error(error));

    const verified = await verifyToken('mockedToken')
    expect(verified).to.deep.equal({ isError: true });
  });
});