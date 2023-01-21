import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('-> GET /leaderboards', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('', async () => {
  })
})