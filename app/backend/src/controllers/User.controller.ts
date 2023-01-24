import { NextFunction, Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const token = await UserService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async validate(req: Request, res: Response): Promise<Response> {
    const { decoded: { data: { role } } } = req.body;
    return res.status(200).json({ role });
  }
}
