import Match from '../database/models/Match.model';

export default class SumHelper {
  static pointsSum(url: string, teamMatches: Match[]) {
    const homeOrAway = url.includes('home') ? 'homeTeamGoals' : 'awayTeamGoals';
    const otherSide = url.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';
    return teamMatches.reduce((acc: number, curr: Match): number => {
      if (curr[homeOrAway] > curr[otherSide]) return acc + 3;
      if (curr[homeOrAway] === curr[otherSide]) return acc + 1;
      return acc;
    }, 0);
  }

  static victories(url: string, teamMatches: Match[]) {
    const homeOrAway = url.includes('home') ? 'homeTeamGoals' : 'awayTeamGoals';
    const otherSide = url.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';
    return teamMatches.reduce((acc: number, curr: Match): number => {
      if (curr[homeOrAway] > curr[otherSide]) return acc + 1;
      return acc;
    }, 0);
  }

  static losses(url: string, teamMatches: Match[]) {
    const homeOrAway = url.includes('home') ? 'homeTeamGoals' : 'awayTeamGoals';
    const otherSide = url.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';
    return teamMatches.reduce((acc: number, curr: Match): number => {
      if (curr[homeOrAway] < curr[otherSide]) return acc + 1;
      return acc;
    }, 0);
  }

  static draws(url: string, teamMatches: Match[]) {
    const homeOrAway = url.includes('home') ? 'homeTeamGoals' : 'awayTeamGoals';
    const otherSide = url.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';
    return teamMatches.reduce((acc: number, curr: Match): number => {
      if (curr[homeOrAway] === curr[otherSide]) return acc + 1;
      return acc;
    }, 0);
  }

  static goalsFavor(url: string, teamMatches: Match[]) {
    const homeOrAway = url.includes('home') ? 'homeTeamGoals' : 'awayTeamGoals';
    return teamMatches.reduce((acc: number, curr: Match): number => acc + curr[homeOrAway], 0);
  }

  static goalsOwn(url: string, teamMatches: Match[]) {
    const otherSide = url.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';
    return teamMatches.reduce((acc: number, curr: Match): number => acc + curr[otherSide], 0);
  }
}

export const totalHomeSum = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const homeVictories = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const drawss = (acc: number, curr: Match): number => {
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
