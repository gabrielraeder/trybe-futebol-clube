import { formatedTeam } from '../controllers/interfaces/leaderboard.interface';
import { sortByGames } from './sortingHome';

const sortByGoalsFavor = (a: formatedTeam, b: formatedTeam) => {
  if (b.totalPoints === a.totalPoints) return +b.goalsFavor - +a.goalsFavor;
  return 0;
};

const sortByEfficiency = (a: formatedTeam, b: formatedTeam) => {
  if (b.goalsFavor === a.goalsFavor && b.totalPoints === a.totalPoints) {
    return +b.efficiency - +a.efficiency;
  }
  return 0;
};

const sortByGoalBalance = (a: formatedTeam, b: formatedTeam) => {
  if (+b.efficiency === +a.efficiency && b.totalPoints === a.totalPoints) {
    return b.goalsBalance - a.goalsBalance;
  }
  return 0;
};

export default (array: formatedTeam[]) => array
  .sort((a, b) => b.totalPoints - a.totalPoints)
  .sort(sortByGoalsFavor)
  .sort(sortByEfficiency)
  .sort(sortByGames)
  .sort(sortByGoalBalance)
  .sort((a, b) => {
    if (b.totalPoints === a.totalPoints && (a.goalsBalance === 0 || b.goalsBalance === 0)) {
      return +b.efficiency - +a.efficiency;
    }
    return 0;
  });

// export const sort = (a: formatedTeam, b: formatedTeam) => ;
// export const sort = (a: formatedTeam, b: formatedTeam) => ;
