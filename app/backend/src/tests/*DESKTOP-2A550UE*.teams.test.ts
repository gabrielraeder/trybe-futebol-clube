import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team.model';

import { Response } from 'superagent';
import { teamsMock } from './mocks/team.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('-> GET /teams', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('Success', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsMock as Team[])

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock);
  })
})

describe('-> GET /teams/:id', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('Success', async () => {
    sinon.stub(Team, 'findByPk').resolves(teamsMock[0] as Team)

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock[0]);
  })
  
  it('Failure', async () => {
    sinon.stub(Team, 'findByPk').resolves();

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/404');

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('Team not found');
  })
})