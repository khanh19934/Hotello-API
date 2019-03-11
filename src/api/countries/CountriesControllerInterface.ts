import * as Hapi from 'hapi'

export interface ICountriesController {
  //   addCity(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  //   removeCity(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  //   updateCity(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>

  getAllCountries(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject>
}
