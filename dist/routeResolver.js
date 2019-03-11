"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CitiesController_1 = require("./api/cities/CitiesController");
var CitiesRoutes_1 = require("./api/cities/CitiesRoutes");
var CountriesController_1 = require("./api/countries/CountriesController");
var CountriesRoutes_1 = require("./api/countries/CountriesRoutes");
var DistrictsController_1 = require("./api/districts/DistrictsController");
var DistrictsRoutes_1 = require("./api/districts/DistrictsRoutes");
var UserController_1 = require("./api/users/UserController");
var UserRoutes_1 = require("./api/users/UserRoutes");
var Cities_1 = require("./entities/Cities");
var Countries_1 = require("./entities/Countries");
var District_1 = require("./entities/District");
var Users_1 = require("./entities/Users");
var CitiesServices_1 = require("./services/CitiesServices");
var CountriesService_1 = require("./services/CountriesService");
var DistrictsServices_1 = require("./services/DistrictsServices");
var UserServices_1 = require("./services/UserServices");
exports.default = (function (connection) {
    var userRepositories = connection.getRepository(Users_1.default);
    var userSrv = new UserServices_1.default(userRepositories);
    var userCtrl = new UserController_1.default(userSrv);
    var citiesRepositories = connection.getRepository(Cities_1.default);
    var citiesSrv = new CitiesServices_1.default(citiesRepositories);
    var citiesCtrl = new CitiesController_1.default(citiesSrv);
    var countriesRepositories = connection.getRepository(Countries_1.default);
    var countriesSrv = new CountriesService_1.default(countriesRepositories);
    var countriesCtrl = new CountriesController_1.default(countriesSrv);
    var districtsRepositories = connection.getRepository(District_1.default);
    var districtsSrv = new DistrictsServices_1.default(districtsRepositories);
    var districtsCtrl = new DistrictsController_1.default(districtsSrv);
    return [
        new UserRoutes_1.default(userCtrl),
        new CitiesRoutes_1.default(citiesCtrl),
        new CountriesRoutes_1.default(countriesCtrl),
        new DistrictsRoutes_1.default(districtsCtrl)
    ];
});
//# sourceMappingURL=routeResolver.js.map