export interface ILeaderIncomplete {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

export interface ILeaderboard extends ILeaderIncomplete {
  goalsBalance: number;
  efficiency: string;
}
