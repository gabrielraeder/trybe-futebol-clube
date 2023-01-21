import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    if (req.query.inProgress) return MatchController.getByQuery(req, res);
    const matches = await MatchService.getAll();
    return res.status(200).json(matches);
  }

  static async getByQuery(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (typeof inProgress !== 'string') {
      return res.status(400).json({ message: 'Bad Request' });
    }
    const matches = await MatchService.getByQuery(inProgress);
    return res.status(200).json(matches);
  }

  static async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await MatchService.endMatch(+id);
    if (type) return res.status(400).json({ message });
    return res.status(200).json({ message });
  }
}
