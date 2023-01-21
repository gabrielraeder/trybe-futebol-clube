export interface IScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatch extends IScore {
  homeTeamId: number,
  awayTeamId: number,
}
