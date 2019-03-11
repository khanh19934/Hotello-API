import * as Hapi from 'hapi'

export interface IUserController {
  createUser(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  requestOTP(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  validateOTP(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  login(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>
}
