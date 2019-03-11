import { Repository } from 'typeorm'

import Countries from '../entities/Countries'

export interface ICountriesServices {
  getAllCountries(): Promise<any>
}

export default class CountriesServices implements ICountriesServices {
  constructor(private countriesRepository: Repository<Countries>) {}
  public getAllCountries() {
    return this.countriesRepository.find()
  }
}
