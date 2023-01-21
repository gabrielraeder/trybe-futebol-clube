import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamService.getAll();
    return res.status(200).json(teams);
  }
}
