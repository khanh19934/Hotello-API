import * as Boom from 'boom'
import * as Hapi from 'hapi'
import { IDistrictsServices } from '../../services/DistrictsServices'

import { IDistrictsController } from './DistrictsControllerInterface'

export default class DistrictsController implements IDistrictsController {
  constructor(private districtsServices: IDistrictsServices) {}

  public async getAllDistrict(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    try {
      const { city_id } = request.params as {
        city_id: string
      }
      const res = await this.districtsServices.getAllDistrictsByCity(Number(city_id))

      return h.response({ statusCode: 200, message: 'ok', data: res })
    } catch (e) {
      throw Boom.internal()
    }
  }
}
