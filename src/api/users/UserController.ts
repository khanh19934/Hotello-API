import * as Boom from 'boom'
import * as Hapi from 'hapi'
import { IUserServices } from '../../services/UserServices'
import { getToken } from '../../utils/common'
import { IUserController } from './UserControllerInterface'

export interface INewUserPayload {
  email: string
  password: string
}

export default class UserController implements IUserController {
  constructor(private userServices: IUserServices) {}

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
