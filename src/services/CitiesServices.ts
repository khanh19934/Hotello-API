import { Repository } from 'typeorm'
import Cities from '../entities/Cities'

export interface ICitiesServices {
  getAllCitiesByCountry(countryId: number): Promise<any>
}

export default class CitiesServices implements ICitiesServices {
  constructor(private citiesRepository: Repository<Cities>) {}
  public getAllCitiesByCountry(countryId: number) {
    return this.citiesRepository.find({ where: { countryId } })
  }
}
