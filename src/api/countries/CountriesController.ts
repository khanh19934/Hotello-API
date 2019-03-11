import * as Boom from 'boom'
import * as Hapi from 'hapi'
import { ICountriesServices } from '../../services/CountriesService'
import { ICountriesController } from './CountriesControllerInterface'

export default class CountriesController implements ICountriesController {
  constructor(private countriesServices: ICountriesServices) {}

  public async getAllCountries(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    try {
      const res = await this.countriesServices.getAllCountries()

      return h.response({ statusCode: 200, message: 'ok', data: res })
    } catch (e) {
      throw Boom.internal()
    }
  }
}
