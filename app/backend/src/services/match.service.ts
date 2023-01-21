import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';
import { IMatch, IScore } from './interfaces/match.interfaces';

export default class MatchService {
  static async getAll(): Promise<Match[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  static async getByQuery(query: string): Promise<Match[]> {
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

  static async create(data: IMatch) {
    const { awayTeamId, homeTeamId } = data;
    const homeTeam = await Match.findByPk(homeTeamId);
    const awayTeam = await Match.findByPk(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { type: 'NOT_FOUND', message: 'There is no team with such id!' };
    }
    const result = await Match.create({ ...data, inProgress: true });
    return { type: null, message: result };
  }

  static async updateScore(id:number, data: IScore) {
    const [qtdUpdated] = await Match.update({ ...data }, { where: { id } });
    if (qtdUpdated === 0) return { type: 'NOT_FOUND', message: 'Match does not exist' };
    return { type: null, message: data };
  }
}
