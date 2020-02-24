import jwt from 'jsonwebtoken';
import User from '../models/User';

import { LoginSchema } from '../validations/Login';

import authConfig from '../../config/auth';

class LoginController {
  async store(req, res) {
    try {
      await LoginSchema.validate(req.body);

      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(400)
          .json({ error: 'Email or Password are invalid!' });
      }

      if (!(await user.checkPassword(password))) {
        return res
          .status(400)
          .json({ error: 'Email or Password are invalid!' });
      }

      const { id, name } = user;

      return res.json({
        user: { id, name },
        token: jwt.sign({ id, name }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new LoginController();
