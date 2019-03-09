"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("./api/users/UserController");
var UserRoutes_1 = require("./api/users/UserRoutes");
var Users_1 = require("./entities/Users");
var UserServices_1 = require("./services/UserServices");
exports.default = (function (connection) {
    var userRepositories = connection.getRepository(Users_1.default);
    var userSrv = new UserServices_1.default(userRepositories);
    var userCtrl = new UserController_1.default(userSrv);
    return [new UserRoutes_1.default(userCtrl)];
});
//# sourceMappingURL=routeResolver.js.map