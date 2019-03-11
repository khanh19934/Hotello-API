import * as Boom from 'boom'
import * as Hapi from 'hapi'
import { ICitiesServices } from '../../services/CitiesServices'
import { ICitiesController } from './CitiesControllerInterface'

export default class CitiesController implements ICitiesController {
  constructor(private citiesServices: ICitiesServices) {}
  public async getAllCityByCountries(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    try {
      const { countries_id } = request.params as { countries_id: string }

      const res = await this.citiesServices.getAllCitiesByCountry(Number(countries_id))

      return h.response({ statusCode: 200, message: 'OK', data: res })
    } catch (e) {
      throw Boom.internal()
    }
  }
}
