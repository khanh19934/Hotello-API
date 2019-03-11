import * as Hapi from 'hapi'

export interface ICitiesController {
  //   addCity(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  //   removeCity(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  //   updateCity(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  getAllCityByCountries(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>
}
