import * as Hapi from 'hapi'

export interface IDistrictsController {
  //   addCity(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  //   removeCity(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  //   updateCity(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  getAllDistrict(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>
}
