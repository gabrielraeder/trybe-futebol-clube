import Team from '../database/models/Team.model';

export default class TeamService {
  static async getAll() {
    const teams = await Team.findAll();
    return teams;
  }
}
