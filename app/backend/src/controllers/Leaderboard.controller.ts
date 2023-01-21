import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getAllHome(req: Request, res: Response) {
    const result = await LeaderboardService.getAllHome();
    const orderedInfo = result.sort((a, b) => b.totalPoints - a.totalPoints);
    return res.status(200).json(orderedInfo);
  }

  static async getAllAway(req: Request, res: Response) {
    const result = await LeaderboardService.getAllAway();
    const orderedInfo = result.sort((a, b) => b.totalPoints - a.totalPoints);
    return res.status(200).json(orderedInfo);
  }

  static async getAll(req: Request, res: Response) {
    const result = await LeaderboardService.getAll();
    return res.status(200).json(result);
  }
}
