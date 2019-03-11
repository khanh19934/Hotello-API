import * as Hapi from 'hapi'
import * as Joi from 'joi'
import { IRoutes } from '../../types/routes'
import { ICitiesController } from './CitiesControllerInterface'

export default class CitiesRoutes implements IRoutes {
  constructor(private citiesController: ICitiesController) {}
  public registerToServer(server: Hapi.Server) {
    server.bind(this.citiesController)

    server.route({
      path: '/cities/{countries_id}',
      method: 'GET',
      handler: this.citiesController.getAllCityByCountries,
      options: {
        auth: false,
        tags: ['api', 'cities'],
        description: 'Get all city by countries id.',
        validate: {
          params: {
            countries_id: Joi.string().required()
          }
        }
      }
    })
  }
}
