import * as Hapi from 'hapi'

import * as Boom from 'boom'

export interface IUserController {
  createUser(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  login(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>
}
