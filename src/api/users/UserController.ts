import * as sgMail from '@sendgrid/mail'
import * as Boom from 'boom'
import * as Hapi from 'hapi'

import configs from '../../configs'
import { convertRegisterResponseDTO } from '../../repositories/DTO/UserDTO'
import { IUserServices } from '../../services/UserServices'
import { checkValidOTPCode, generateOTPCode, getToken } from '../../utils/common'
import { IUserController } from './UserControllerInterface'

export interface INewUserPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  countryId: number
  cityId: number
  districtId: number
}

export default class UserController implements IUserController {
  constructor(private userServices: IUserServices) {}

  public async requestOTP(req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    const { id } = req.payload as { id: number }
    const res = await this.userServices.requestOTPServices(id)

    if (res) {
      return h.response({ statusCode: 200, message: 'OK', data: null })
    }
    throw Boom.forbidden('User Not Found')
  }

  public async validateOTP(req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    const { otpCode, id } = req.payload as { otpCode: string; id: number }

    const { isValid, message } = checkValidOTPCode(otpCode)

    if (isValid) {
      await this.userServices.activeUser({ id })

      return h.response({ statusCode: 200, message: 'OK', data: null })
    }

    return h.response({ statusCode: 200, message, data: null })
  }

  public async createUser(req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    try {
      const res = await this.userServices.createUser(req.payload as INewUserPayload)

      return h.response({ statusCode: 200, message: 'ok', data: convertRegisterResponseDTO(res) })
    } catch (e) {
      throw Boom.forbidden(e)
    }
  }

  public async login(req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    const { email, password } = req.payload as { email: string; password: string }

    const { isValid, id } = await this.userServices.loginUserServices({
      email,
      password
    })

    if (isValid) {
      return h.response({
        statusCode: 200,
        message: 'SUCCESS',
        accessToken: getToken(id)
      })
    }

    throw Boom.unauthorized()
  }
}
