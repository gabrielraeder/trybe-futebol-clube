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

  static async create(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const data = {
      homeTeamId: +homeTeamId,
      awayTeamId: +awayTeamId,
      homeTeamGoals: +homeTeamGoals,
      awayTeamGoals: +awayTeamGoals,
    };

    const { type, message } = await MatchService.create(data);
    if (type === 'TOKEN_INVALID') return res.status(401).json({ message });
    if (type) return res.status(404).json({ message });
    return res.status(201).json(message);
  }

  static async updateScore(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await MatchService.updateScore(+id, req.body);
    if (type) return res.status(400).json({ message });
    return res.status(200).json(message);
  }
}
