import { formatedTeam } from '../controllers/interfaces/leaderboard.interface';

export const sortByEfficiency = (a: formatedTeam, b: formatedTeam) => {
  if (b.totalPoints === a.totalPoints) return +b.efficiency - +a.efficiency;
  return 0;
};

export const sortByGames = (a: formatedTeam, b: formatedTeam) => {
  if (+b.efficiency === +a.efficiency && b.totalPoints === a.totalPoints) {
    return a.totalGames - b.totalGames;
  }
  return 0;
};

export const sortByGoalsFavor = (a: formatedTeam, b: formatedTeam) => {
  if (a.totalGames === b.totalGames && b.totalPoints === a.totalPoints) {
    return b.goalsFavor - a.goalsFavor;
  }
  return 0;
};
export const sortByGoalBalance = (a: formatedTeam, b: formatedTeam) => {
  if (a.goalsFavor === b.goalsFavor && b.totalPoints === a.totalPoints) {
    return b.goalsBalance - a.goalsBalance;
  }
  return 0;
};

export default (array: formatedTeam[]) => array
  .sort((a, b) => b.totalPoints - a.totalPoints)
  .sort(sortByEfficiency)
  .sort(sortByGames)
  .sort(sortByGoalsFavor)
  .sort(sortByGoalBalance);
// export const sortByGames = (a: formatedTeam, b: formatedTeam) => ;
// export const sortByGames = (a: formatedTeam, b: formatedTeam) => ;
