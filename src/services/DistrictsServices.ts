import { Repository } from 'typeorm'
import Districts from '../entities/District'

export interface IDistrictsServices {
  getAllDistrictsByCity(cityId: number): Promise<any>
}

export default class DistrictsServices implements IDistrictsServices {
  constructor(private districtsRepository: Repository<Districts>) {}
  public getAllDistrictsByCity(cityId: number) {
    return this.districtsRepository.find({ where: { cityId } })
  }
}
