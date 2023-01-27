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
