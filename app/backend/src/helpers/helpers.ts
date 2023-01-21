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

export const awayLosses = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const awayGoalsFavor = (acc: number, curr: Match): number => acc + curr.awayTeamGoals;

export const awayGoalsOwn = (acc: number, curr: Match): number => acc + curr.homeTeamGoals;
