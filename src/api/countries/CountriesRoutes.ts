import * as Hapi from 'hapi'
import { IRoutes } from '../../types/routes'
import { ICountriesController } from './CountriesControllerInterface'

export default class CountriesRoutes implements IRoutes {
  constructor(private countriesController: ICountriesController) {}
  public registerToServer(server: Hapi.Server) {
    server.bind(this.countriesController)

    server.route({
      path: '/countries',
      method: 'GET',
      handler: this.countriesController.getAllCountries,
      options: {
        auth: false,
        tags: ['api', 'countries'],
        description: 'Get all countries.',
        plugins: {
          'hapi-swagger': {
            responses: {
              '200': {
                description: 'Get All Countries success'
              },
              '400': {
                description: 'Bad Request'
              },
              '500': {
                description: 'Internal Server Error'
              }
            }
          }
        }
      }
    })
  }
}
