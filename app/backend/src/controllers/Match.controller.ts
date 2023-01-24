import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/httpException';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    if (req.query.inProgress) return MatchController.getByQuery(req, res);
    const matches = await MatchService.getAll();
    return res.status(200).json(matches);
  }

  static async getByQuery(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (typeof inProgress !== 'string') {
      throw new HttpException(422, 'Bad Request');
    }
    const matches = await MatchService.getByQuery(inProgress);
    return res.status(200).json(matches);
  }

  static async endMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const message = await MatchService.endMatch(+id);
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
      const data = {
        homeTeamId: +homeTeamId,
        awayTeamId: +awayTeamId,
        homeTeamGoals: +homeTeamGoals,
        awayTeamGoals: +awayTeamGoals,
      };
      const newMatch = await MatchService.create(data);
      return res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  }

  static async updateScore(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const data = await MatchService.updateScore(+id, req.body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
