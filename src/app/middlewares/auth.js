import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'You dont have authorization!' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ error: 'You dont have authorization!' });
  }

  return next();
};
