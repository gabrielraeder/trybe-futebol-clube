import Match from '../../database/models/Match.model';
import Team from '../../database/models/Team.model';

export interface ILeaderNumbers {
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

export interface ILeaderIncomplete extends ILeaderNumbers {
  name: string;

}

export interface ILeaderboard extends ILeaderIncomplete {
  goalsBalance: number;
  efficiency: string;
}

export interface IDbReturn {
  teams: Team[],
  matches: Match[],
}
