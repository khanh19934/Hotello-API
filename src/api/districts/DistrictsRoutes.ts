import * as Hapi from 'hapi'
import * as Joi from 'joi'
import { IRoutes } from '../../types/routes'
import { IDistrictsController } from './DistrictsControllerInterface'

export default class DistrictsRoutes implements IRoutes {
  constructor(private districtsController: IDistrictsController) {}
  public registerToServer(server: Hapi.Server) {
    server.bind(this.districtsController)

    server.route({
      path: '/districts/{city_id}',
      method: 'GET',
      handler: this.districtsController.getAllDistrict,
      options: {
        auth: false,
        tags: ['api', 'districts'],
        description: 'Get all districts by city id.',
        validate: {
          params: {
            city_id: Joi.string().required()
          }
        }
      }
    })
  }
}
