import { Connection } from 'typeorm'

import CitiesController from './api/cities/CitiesController'
import CitiesRoutes from './api/cities/CitiesRoutes'
import CountriesController from './api/countries/CountriesController'
import CountriesRoutes from './api/countries/CountriesRoutes'
import DistrictsController from './api/districts/DistrictsController'
import DistrictsRoutes from './api/districts/DistrictsRoutes'
import UserController from './api/users/UserController'
import UserRoutes from './api/users/UserRoutes'
import Cities from './entities/Cities'
import Countries from './entities/Countries'
import Districts from './entities/District'
import Users from './entities/Users'
import CitiesServices from './services/CitiesServices'
import CountriesServices from './services/CountriesService'
import DistrictsServices from './services/DistrictsServices'
import UserServices from './services/UserServices'

export default (connection: Connection) => {
  const userRepositories = connection.getRepository(Users)
  const userSrv = new UserServices(userRepositories)
  const userCtrl = new UserController(userSrv)

  const citiesRepositories = connection.getRepository(Cities)
  const citiesSrv = new CitiesServices(citiesRepositories)
  const citiesCtrl = new CitiesController(citiesSrv)

  const countriesRepositories = connection.getRepository(Countries)
  const countriesSrv = new CountriesServices(countriesRepositories)
  const countriesCtrl = new CountriesController(countriesSrv)

  const districtsRepositories = connection.getRepository(Districts)
  const districtsSrv = new DistrictsServices(districtsRepositories)
  const districtsCtrl = new DistrictsController(districtsSrv)

  return [
    new UserRoutes(userCtrl),
    new CitiesRoutes(citiesCtrl),
    new CountriesRoutes(countriesCtrl),
    new DistrictsRoutes(districtsCtrl)
  ]
}
