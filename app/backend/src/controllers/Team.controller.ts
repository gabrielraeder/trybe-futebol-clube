import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamService.getAll();
    return res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await TeamService.getById(+id);
    if (type) return res.status(400).json({ message });
    return res.status(200).json(message);
  }
}
