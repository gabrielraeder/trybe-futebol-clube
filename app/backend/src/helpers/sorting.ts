import { formatedTeam } from '../controllers/interfaces/leaderboard.interface';

export default (array: formatedTeam[]): formatedTeam[] => array
  .sort((a, b) => {
    if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
    if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
    if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
    // if (b.goalsFavor - a.goalsFavor !== 0)
    return b.goalsFavor - a.goalsFavor;
    // return b.goalsOwn - a.goalsOwn;
  });
