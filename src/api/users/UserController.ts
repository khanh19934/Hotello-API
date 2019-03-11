import * as sgMail from '@sendgrid/mail'
import * as Boom from 'boom'
import * as Hapi from 'hapi'

import configs from '../../configs'
import { IUserServices } from '../../services/UserServices'
import getEmailTemp from '../../templates/email'
import { checkValidOTPCode, generateOTPCode, getToken } from '../../utils/common'
import { IUserController } from './UserControllerInterface'

export interface INewUserPayload {
  email: string
  password: string
}

export default class UserController implements IUserController {
  constructor(private userServices: IUserServices) {}

  public async requestOTP(req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    const otpCode = generateOTPCode()

    sgMail.setApiKey(configs.SEND_GRID.API_KEY)

    const { email, first_name, last_name } = req.payload as { email: string; first_name: string; last_name: string }
    const fullName = `${first_name} ${last_name}`

    const msg = {
      to: email,
      // To do: will change this email when have original email
      from: 'khanh19934@gmail.com',
      subject: 'Hotello Active Code',
      text: 'Hotello Active code',
      html: getEmailTemp(otpCode, fullName)
    }

    sgMail.send(msg)

    return h.response({ statusCode: 200, message: 'OK', data: null })
  }

  public async validateOTP(req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    const { otpCode } = req.payload as { otpCode: string }

    const { isValid, message } = checkValidOTPCode(otpCode)

    if (isValid) {
      return h.response({ statusCode: 200, message: 'OK', data: null })
    }

    return h.response({ statusCode: 200, message, data: null })
  }

  public async createUser(req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    const res = await this.userServices.createUser(req.payload as INewUserPayload)

    return h.response({ statusCode: 200, message: 'ok', data: null })
  }

  public async login(req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    const { email, password } = req.payload as INewUserPayload

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
