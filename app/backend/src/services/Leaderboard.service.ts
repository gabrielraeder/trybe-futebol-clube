import sorting from '../helpers/sorting';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import SumHelper from '../helpers/helpers';
import { ILeaderboard, ILeaderNumbers } from './interfaces/leaderboard.interface';

export default class LeaderboardService {
  static mapInfo(
    matchesByTeam: Match[][],
    teams: Team[],
    url:string,
  ): ILeaderboard[] {
    const newInfo = matchesByTeam.map((team, index) => ({
      name: teams[index].teamName,
      totalPoints: SumHelper.pointsSum(url, team),
      totalGames: team.length,
      totalVictories: SumHelper.victories(url, team),
      totalDraws: SumHelper.draws(url, team),
      totalLosses: SumHelper.losses(url, team),
      goalsFavor: SumHelper.goalsFavor(url, team),
      goalsOwn: SumHelper.goalsOwn(url, team),
      goalsBalance: SumHelper.goalsFavor(url, team) - SumHelper.goalsOwn(url, team),
      efficiency: ((SumHelper.pointsSum(url, team) / (team.length * 3)) * 100).toFixed(2),
    }));

    return newInfo;
  }

  static async getInfo(url: string): Promise<ILeaderboard[]> {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });
    const homeOrAway = url.includes('home') ? 'homeTeamId' : 'awayTeamId';
    const matchesByTeam = teams.map((team) => matches.filter((m) => m[homeOrAway] === team.id));
    return LeaderboardService.mapInfo(matchesByTeam, teams, url);
  }

  static sumAll(home:ILeaderNumbers[], away:ILeaderNumbers[]): ILeaderNumbers[] {
    const keys = (Object.keys(home[0]) as (keyof ILeaderNumbers)[]);
    const totals = home
      .map((team, index) => keys
        .reduce((acc, curr) => ({
          ...acc,
          [curr]: team[curr] + away[index][curr],
        }), {} as ILeaderNumbers));
    return totals;
  }

  static async getAll(url: string): Promise<ILeaderboard[]> {
    const home = await LeaderboardService.getInfo('home');
    const away = await LeaderboardService.getInfo('away');
    if (url.includes('home')) {
      return sorting(home);
    }
    if (url.includes('away')) {
      return sorting(away);
    }
    const totals = LeaderboardService.sumAll(home, away);
    const data = totals.map((team, index) => ({
      ...team,
      name: home[index].name,
      goalsBalance: team.goalsFavor - team.goalsOwn,
      efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
    }));
    return sorting(data);
  }
}
