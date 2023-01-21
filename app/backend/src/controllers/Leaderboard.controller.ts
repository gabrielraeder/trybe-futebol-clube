import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';
import sortingHome from '../helpers/sortingHome';
import sortingAway from '../helpers/sortingAway';

export default class LeaderboardController {
  static async getAllHome(req: Request, res: Response) {
    const result = await LeaderboardService.getAllHome();
    const ordered = sortingHome(result);

    return res.status(200).json(ordered);
  }

  static async getAllAway(req: Request, res: Response) {
    const result = await LeaderboardService.getAllAway();
    const ordered = sortingAway(result);

    return res.status(200).json(ordered);
  }

  static async getAll(req: Request, res: Response) {
    const result = await LeaderboardService.getAll();
    const ordered = sortingHome(result)
      .sort((a, b) => {
        if (a.totalGames === b.totalGames && a.totalPoints === b.totalPoints) {
          return b.goalsBalance - a.goalsBalance;
        }
        return 0;
      });

    return res.status(200).json(ordered);
  }
}
