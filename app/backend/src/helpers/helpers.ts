// import { formatedTeam } from '../controllers/interfaces/leaderboard.interface';
import Match from '../database/models/Match.model';

export const totalHomeSum = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const homeVictories = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const draws = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const homeLosses = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const homeGoalsFavor = (acc: number, curr: Match): number => acc + curr.homeTeamGoals;

export const homeGoalsOwn = (acc: number, curr: Match): number => acc + curr.awayTeamGoals;

export const totalAwaySum = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 3;
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const awayVictories = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
  return acc;
};

// export const awayDraws = (acc: number, curr: Match): number => {
//   if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
//   return acc;
// };

export const awayLosses = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const awayGoalsFavor = (acc: number, curr: Match): number => acc + curr.awayTeamGoals;

export const awayGoalsOwn = (acc: number, curr: Match): number => acc + curr.homeTeamGoals;

// export const firstSortingHome = (array: formatedTeam[]) => array
//   .sort((a, b) => b.totalPoints - a.totalPoints)
//   .sort((a, b) => {
//     if (b.totalPoints === a.totalPoints) return +b.efficiency - +a.efficiency;
//     return 0;
//   })
//   .sort((a, b) => {
//     if (+b.efficiency === +a.efficiency && b.totalPoints === a.totalPoints) {
//       return a.totalGames - b.totalGames;
//     }
//     return 0;
//   });

// export const sortingHome = (array: formatedTeam[]) => {
//   const firstSort = firstSortingHome(array);
//   return firstSort.sort((a, b) => {
//     if (a.totalGames === b.totalGames && b.totalPoints === a.totalPoints) {
//       return b.goalsFavor - a.goalsFavor;
//     }
//     return 0;
//   })
//     .sort((a, b) => {
//       if (a.goalsFavor === b.goalsFavor && b.totalPoints === a.totalPoints) {
//         return b.goalsBalance - a.goalsBalance;
//       }
//       return 0;
//     });
// };
