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
