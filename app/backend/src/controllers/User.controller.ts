import { Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  constructor(private userService = new UserService()) { }

  static async login(req: Request, res: Response) {
    const { type, message } = await UserService.login(req.body);
    if (type) return res.status(400).json({ message });
    return res.status(200).json({ token: message });
  }
}
