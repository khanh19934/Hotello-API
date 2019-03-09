import * as Hapi from 'hapi'
import { IRoutes } from '../../types/routes'
import UserController from './UserController'

export default class UserRoutes implements IRoutes {
  constructor(private userController: UserController) {}
  public registerToServer(server: Hapi.Server) {
    server.bind(this.userController)

    server.route({
      path: '/signUp',
      method: 'POST',
      handler: this.userController.createUser,
      options: {
        auth: false
      }
    })

    server.route({
      path: '/login',
      method: 'POST',
      handler: this.userController.login,
      options: {
        auth: false
      }
    })
  }
}
