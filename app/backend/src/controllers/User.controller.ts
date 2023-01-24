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

  static async validate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const token = req.header('Authorization');
      const role = await UserService.validate(token as string);
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
