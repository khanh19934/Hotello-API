import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Repository } from 'typeorm';
import Constants from '../constants/Constants';
import Users from '../entities/Users';

const createHash = async (password: string) =>
  bcrypt.hash(password, Constants.SALT_ROUND);

const comparePassword = async (password: string, hashPassword: string) =>
  bcrypt.compare(password, hashPassword);

const getToken = (id: number) =>
  jwt.sign({ id }, Constants.TOKEN_SECRET_KEY, { expiresIn: `${30 * 24}h` });

const validateUserId = (userRepository: Repository<Users>) => async (
  decoded,
  request
) => {
  if (isNilOrEmpty(decoded)) return { isValid: false };
  const res = await userRepository.findOne({ where: { id: decoded.id } });

  if (isNilOrEmpty(res)) {
    return { isValid: false };
  }

  return { isValid: true };
};

export { createHash, comparePassword, getToken, validateUserId };
