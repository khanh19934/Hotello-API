import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import { authenticator, totp } from 'otplib'
import { isNilOrEmpty } from 'ramda-adjunct'
import { Repository } from 'typeorm'

import Configs from '../configs'
import Constants from '../constants/Constants'
import Users from '../entities/Users'

const createHash = async (password: string) => bcrypt.hash(password, Constants.SALT_ROUND)

const comparePassword = async (password: string, hashPassword: string) => bcrypt.compare(password, hashPassword)

const getToken = (id: number) => jwt.sign({ id }, Constants.TOKEN_SECRET_KEY, { expiresIn: `${30 * 24}h` })

const validateUserId = (userRepository: Repository<Users>) => async (decoded, request) => {
  if (isNilOrEmpty(decoded)) return { isValid: false }
  const res = await userRepository.findOne({ where: { id: decoded.id } })

  if (isNilOrEmpty(res)) {
    return { isValid: false }
  }

  return { isValid: true }
}

const generateOTPCode = () => {
  totp.options = { crypto, digits: 6, step: 60 * 10 }
  const secret = Configs.OTP.SECRET_KEY

  const otpCode = totp.generate(secret)

  return otpCode
}

const checkValidOTPCode = otpCode => {
  const step = totp.timeUsed()
  const isValid = totp.check(otpCode, Configs.OTP.SECRET_KEY)
  if (isValid) {
    if (step !== 0) {
      return { isValid: true, message: 'OK' }
    }

    return { isValid: false, message: 'OTP_EXPIRED' }
  }

  return { isValid: false, message: 'OTP_NOT_CORRECT' }
}

export { createHash, comparePassword, getToken, validateUserId, generateOTPCode, checkValidOTPCode }
