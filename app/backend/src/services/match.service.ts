import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';

export default class MatchService {
  static async getAll() {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
