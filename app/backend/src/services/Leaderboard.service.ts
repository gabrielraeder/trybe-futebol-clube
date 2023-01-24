import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import {
  totalHomeSum,
  draws,
  homeGoalsFavor,
  homeGoalsOwn,
  homeLosses,
  homeVictories,
  totalAwaySum,
  awayVictories,
  awayLosses,
  awayGoalsFavor,
  awayGoalsOwn } from '../helpers/helpers';
import { ILeaderboard, ILeaderIncomplete } from './interfaces/leaderboard.interface';

export default class LeaderboardService {
  static async getMatchesByHomeTeam(id:number): Promise<Match[]> {
    const matches = await Match.findAll({ where: { homeTeamId: id, inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  static async getHomeInfo(): Promise<Match[][]> {
    const teams = await Team.findAll();
    const promises = teams.map((team) => LeaderboardService.getMatchesByHomeTeam(team.id));
    const matches = await Promise.all(promises);
    return matches;
  }

  static async getAllHome(): Promise<ILeaderboard[]> {
    const teams = await Team.findAll();
    const data = await LeaderboardService.getHomeInfo();
    const newInfo = data.map((team, index) => ({
      name: teams[index].teamName,
      totalPoints: team.reduce(totalHomeSum, 0),
      totalGames: team.length,
      totalVictories: team.reduce(homeVictories, 0),
      totalDraws: team.reduce(draws, 0),
      totalLosses: team.reduce(homeLosses, 0),
      goalsFavor: team.reduce(homeGoalsFavor, 0),
      goalsOwn: team.reduce(homeGoalsOwn, 0),
      goalsBalance: team.reduce(homeGoalsFavor, 0) - team.reduce(homeGoalsOwn, 0),
      efficiency: ((team.reduce(totalHomeSum, 0) / (team.length * 3)) * 100).toFixed(2),
    }));

    return newInfo;
  }

  static async getMatchesByAwayTeam(id:number): Promise<Match[]> {
    const matches = await Match.findAll({ where: { awayTeamId: id, inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  static async getAwayInfo(): Promise<Match[][]> {
    const teams = await Team.findAll();
    const promises = teams.map((team) => LeaderboardService.getMatchesByAwayTeam(team.id));
    const matches = await Promise.all(promises);
    return matches;
  }

  static async getAllAway(): Promise<ILeaderboard[]> {
    const teams = await Team.findAll();
    const data = await LeaderboardService.getAwayInfo();
    const newInfo = data.map((team, index) => ({
      name: teams[index].teamName,
      totalPoints: team.reduce(totalAwaySum, 0),
      totalGames: team.length,
      totalVictories: team.reduce(awayVictories, 0),
      totalDraws: team.reduce(draws, 0),
      totalLosses: team.reduce(awayLosses, 0),
      goalsFavor: team.reduce(awayGoalsFavor, 0),
      goalsOwn: team.reduce(awayGoalsOwn, 0),
      goalsBalance: team.reduce(awayGoalsFavor, 0) - team.reduce(awayGoalsOwn, 0),
      efficiency: ((team.reduce(totalAwaySum, 0) / (team.length * 3)) * 100).toFixed(2),
    }));

    return newInfo;
  }

  static async sumAll(): Promise<ILeaderIncomplete[]> {
    const home = await LeaderboardService.getAllHome();
    const away = await LeaderboardService.getAllAway();
    const totals = home.map((team, index) => ({
      name: team.name,
      totalPoints: team.totalPoints + away[index].totalPoints,
      totalGames: team.totalGames + away[index].totalGames,
      totalVictories: team.totalVictories + away[index].totalVictories,
      totalDraws: team.totalDraws + away[index].totalDraws,
      totalLosses: team.totalLosses + away[index].totalLosses,
      goalsFavor: team.goalsFavor + away[index].goalsFavor,
      goalsOwn: team.goalsOwn + away[index].goalsOwn,
    }));
    return totals;
  }

  static async getAll(): Promise<ILeaderboard[]> {
    const data = await LeaderboardService.sumAll();
    return data.map((team) => ({
      ...team,
      goalsBalance: team.goalsFavor - team.goalsOwn,
      efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
    }));
  }
}
