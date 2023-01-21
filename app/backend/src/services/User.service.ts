import * as bcrypt from 'bcryptjs';
import User from '../database/models/User.model';
import { Login, validateResponse } from './interfaces/user.interfaces';
import { createToken, verifyToken } from '../auth/jwtFunctions';

export default class UserService {
  static async login(data: Login) {
    const { email, password } = data;

    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return { type: 'NOT_FOUND', message: 'Incorrect email or password' };
    }

    const checkPassword = bcrypt.compareSync(password, findUser.dataValues.password);
    if (!checkPassword) {
      return { type: 'NOT_FOUND', message: 'Incorrect email or password' };
    }
    const { password: _pass, ...userWithoutPassword } = findUser.dataValues;
    const token = createToken(userWithoutPassword);
    return { type: null, message: token };
  }

  static async validate(token: string): Promise<validateResponse> {
    const isValid = verifyToken(token);

    if (typeof isValid === 'string') {
      return { type: 'NOT_FOUND', message: 'Invalid Token' };
    }
    const findUser = await User.findOne({ where: { email: isValid.data.email } });

    if (!findUser) {
      return { type: 'NOT_FOUND', message: 'user not found' };
    }
    return { type: null, message: findUser.dataValues.role };
  }
}
