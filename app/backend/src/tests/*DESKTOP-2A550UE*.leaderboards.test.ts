import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';

import { Response } from 'superagent';
import { teamsMock } from './mocks/team.mocks';
import allMatchesMock from './mocks/allMatches.mock';
import homeLeaderboardMock from './mocks/homeLeaderboard.mock';
import awayLeaderboardMock from './mocks/awayLeaderboard.mock';
import leaderboardMock from './mocks/leaderboard.mock';
import LeaderboardService from '../services/Leaderboard.service';
import allLeaderboardsMock from './mocks/allLeaderboards.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('-> GET /leaderboards', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('Success', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
    sinon.stub(Match, 'findAll').resolves(allMatchesMock as unknown as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(leaderboardMock);
  })
})

describe('-> GET /leaderboards/home', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('Success', async () => {    
    sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
    sinon.stub(Match, 'findAll').resolves(allMatchesMock as unknown as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(homeLeaderboardMock);
  })
})

describe('-> GET /leaderboards/away', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('Success', async () => {    
    sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
    sinon.stub(Match, 'findAll').resolves(allMatchesMock as unknown as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away');
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(awayLeaderboardMock);
  })
})

describe('-> Sorting function', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('check', async () => {
    const originalOrder = allLeaderboardsMock.sort((a, b) => +a.efficiency - +b.efficiency)
    sinon.stub(LeaderboardService, 'getAll').resolves(originalOrder);

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard');
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allLeaderboardsMock);
  })

})