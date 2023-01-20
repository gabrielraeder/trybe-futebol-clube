import { Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import UserService from '../services/User.service';

export default class UserController {
  constructor(private userService = new UserService()) { }

  static async login(req: Request, res: Response) {
    const { type, message } = await UserService.login(req.body);
    if (type) return res.status(401).json({ message });
    return res.status(200).json({ token: message });
  }

  static async validate(req: Request, res: Response) {
    const token = req.header('Authorization');
    if (!token) throw new HttpException(400, 'Token not Found');
    const role = await UserService.validate(token);
    return res.status(200).json({ role });
  }
}
