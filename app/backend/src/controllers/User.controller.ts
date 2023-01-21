import { Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { type, message } = await UserService.login(req.body);
    if (type) return res.status(401).json({ message });
    return res.status(200).json({ token: message });
  }

  static async validate(req: Request, res: Response) {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ message: 'Token not found' });
    const { type, message } = await UserService.validate(token);
    if (type) return res.status(401).json({ message });
    return res.status(200).json({ role: message });
  }
}
