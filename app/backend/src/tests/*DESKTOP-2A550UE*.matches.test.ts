import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match.model';

import { Response } from 'superagent';
import { matchesMock, matchToCreate, matchWithSameTeam } from './mocks/match.mocks';
import { jwtPayload } from './mocks/jwt.mock'
import { mockedToken } from './mocks/user.mocks';
import { teamsMock } from './mocks/team.mocks';
import Team from '../database/models/Team.model';

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

describe('-> PATCH /matches/:id/finish', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('SUCCESS', async () => {
    sinon.stub(Match, 'update').resolves([1]);

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body.message).to.equal('Finished');

    
  })

  it('FAILURE', async () => {
    sinon.stub(Match, 'update').resolves([0]);

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/555/finish');

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('Match does not exist');
  })
})

describe.only('-> POST /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })

  it('Without sending Token', async () => {
    sinon.stub(jwt, 'verify').resolves(jwtPayload);

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches').send(matchWithSameTeam);

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Token must be a valid token');
  })

  it('With Invalid Token', async () => {
    sinon.stub(jwt, 'verify').throws(new Error('error'));

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches').send(matchWithSameTeam).set('Authorization', 'mockedToken');

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Token must be a valid token');
  })
  
  it('FAILURE - It is not possible to create a match with two equal teams', async () => {
    sinon.stub(jwt, 'verify').resolves(jwtPayload);
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches').send(matchWithSameTeam).set('Authorization', mockedToken);

    expect(chaiHttpResponse.status).to.equal(422);
    expect(chaiHttpResponse.body.message).to.equal('It is not possible to create a match with two equal teams');
  })

  it('Home Team doesnt exists', async () => {
    sinon.stub(Match, 'findByPk')
      .onFirstCall().resolves()
      .onSecondCall().resolves(teamsMock[1] as Team);
    sinon.stub(jwt, 'verify').resolves(jwtPayload);

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches').send(matchToCreate).set('Authorization', mockedToken);

    expect(chaiHttpResponse.status).to.equal(404);
    expect(chaiHttpResponse.body.message).to.equal('There is no team with such id!');
  })

  it('Away Team doesnt exists', async () => {
    sinon.stub(Match, 'findByPk')
      .onFirstCall().resolves(teamsMock[0] as Team)
      .onSecondCall().resolves();
    sinon.stub(jwt, 'verify').resolves(jwtPayload);

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches').send(matchToCreate).set('Authorization', mockedToken);

    expect(chaiHttpResponse.status).to.equal(404);
    expect(chaiHttpResponse.body.message).to.equal('There is no team with such id!');
  })
})

// describe('-> ', () => {
//   let chaiHttpResponse: Response;

//   afterEach(()=>{
//       sinon.restore()
//     })
  
// it('', async () => {
//   sinon.stub(Match, '').resolves();
//   chaiHttpResponse = await chai
//     .request(app)
//     .post('/').send().set('Authorization',);
// })

// it('', async () => {
//   sinon.stub(Match, '').resolves();
//   chaiHttpResponse = await chai
//     .request(app)
//     .post('/').send().set('Authorization',);
// })
// })