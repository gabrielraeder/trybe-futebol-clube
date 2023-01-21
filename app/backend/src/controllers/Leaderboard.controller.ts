import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';
import sorting from '../helpers/sorting';

export default class LeaderboardController {
  static async getAllHome(req: Request, res: Response) {
    const result = await LeaderboardService.getAllHome();
    const ordered = sorting(result);

    return res.status(200).json(ordered);
  }

  static async getAllAway(req: Request, res: Response) {
    const result = await LeaderboardService.getAllAway();
    const ordered = sorting(result);

    return res.status(200).json(ordered);
  }

  static async getAll(req: Request, res: Response) {
    const result = await LeaderboardService.getAll();
    const ordered = sorting(result);

    return res.status(200).json(ordered);
  }
}
