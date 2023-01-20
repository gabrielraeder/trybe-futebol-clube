import * as bcrypt from 'bcryptjs';
// import HttpException from '../exceptions/HttpException';
import User from '../database/models/User.model';
import { Login } from './interfaces/user.interfaces';
import { createToken } from '../auth/jwtFunctions';

export default class UserService {
  // public model = User;

  static async login(data: Login) {
    const { email, password } = data;
    console.log(data);

    const findUser = await User.findAll({ where: { email } });
    console.log(findUser);

    if (!findUser || findUser.length === 0) {
      return { type: 'NOT_FOUND', message: 'User not found' };
    }
    const checkPassword = bcrypt.compareSync(password, findUser[0].dataValues.password);
    if (!checkPassword) {
      return { type: 'NOT_FOUND', message: 'password invalid' };
    }
    const { password: _pass, ...userWithoutPassword } = findUser[0].dataValues;
    const token = createToken(userWithoutPassword);
    return { type: null, message: token };
  }
}
