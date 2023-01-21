import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match.model';

import { Response } from 'superagent';
import { matchesMock } from './mocks/match.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('-> GET /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('Requisição com SUCESSO', async () => {
    sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
  })
})

describe('-> GET /matches?inProgress=', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('FALSE', async () => {
    const filterFalse = matchesMock.filter((m) => m.inProgress === false);
    sinon.stub(Match, 'findAll').resolves(filterFalse as unknown as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(filterFalse);
  })

  it('TRUE', async () => {
    const filterTrue = matchesMock.filter((m) => m.inProgress === true);
    sinon.stub(Match, 'findAll').resolves(filterTrue as unknown as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(filterTrue);
  })
})