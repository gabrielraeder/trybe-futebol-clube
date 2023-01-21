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

  static async getByQuery(query: string) {
    const inProgress = query === 'true';
    const matches = await Match.findAll({ where: { inProgress },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });
    return matches;
  }

  static async endMatch(id: number) {
    const [qtdUpdated] = await Match.update({ inProgress: false }, { where: { id } });
    if (qtdUpdated === 0) return { type: 'NOT_FOUND', message: 'Match does not exist' };
    return { type: null, message: 'Finished' };
  }
}
