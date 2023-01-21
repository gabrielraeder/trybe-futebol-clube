import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getAllHome(req: Request, res: Response) {
    const result = await LeaderboardService.getAllHome();
    return res.status(200).json(result);
  }

  static async getAllAway(req: Request, res: Response) {
    const result = await LeaderboardService.getAllAway();
    return res.status(200).json(result);
  }
}
