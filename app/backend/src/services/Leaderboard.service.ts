import sorting from '../helpers/sorting';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import SumHelper from '../helpers/helpers';
import { IDbReturn, ILeaderboard, ILeaderNumbers } from './interfaces/leaderboard.interface';

export default class LeaderboardService {
  static mapInfo(
    matchesByTeam: Match[][],
    teams: Team[],
    url:string,
  ): ILeaderboard[] {
    const sumHelper = new SumHelper(url);
    return matchesByTeam.map((team, index) => sumHelper.properties
      .reduce((acc, curr) => ({
        ...acc,
        name: teams[index].teamName,
        [curr]: sumHelper.calculate(team, curr),
      }), {} as ILeaderboard));
  }

  static getInfo(url: string, teams: Team[], matches: Match[]): ILeaderboard[] {
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

  static async dbSearchs(): Promise<IDbReturn> {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });
    return { teams, matches };
  }

  static async getAll(url: string): Promise<ILeaderboard[]> {
    const { teams, matches } = await LeaderboardService.dbSearchs();
    const home = LeaderboardService.getInfo('home', teams, matches);
    const away = LeaderboardService.getInfo('away', teams, matches);
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
