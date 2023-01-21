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

export default class LeaderboardService {
  static async getMatchesByHomeTeam(id:number) {
    const matches = await Match.findAll({ where: { homeTeamId: id, inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  static async getHomeInfo() {
    const teams = await Team.findAll();
    const promises = teams.map((team) => LeaderboardService.getMatchesByHomeTeam(team.id));
    const matches = await Promise.all(promises);
    return matches;
  }

  static async getAllHome() {
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

    const orderedInfo = newInfo.sort((a, b) => b.totalPoints - a.totalPoints);
    return orderedInfo;
  }

  static async getMatchesByAwayTeam(id:number) {
    const matches = await Match.findAll({ where: { awayTeamId: id, inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  static async getAwayInfo() {
    const teams = await Team.findAll();
    const promises = teams.map((team) => LeaderboardService.getMatchesByAwayTeam(team.id));
    const matches = await Promise.all(promises);
    return matches;
  }

  static async getAllAway() {
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

    const orderedInfo = newInfo.sort((a, b) => b.totalPoints - a.totalPoints);
    return orderedInfo;
  }
}

// totalPoints: team.reduce((acc, curr): number => {
//   if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
//   if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
//   return acc;
// }, 0),
