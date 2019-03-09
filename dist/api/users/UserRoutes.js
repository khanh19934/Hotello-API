"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRoutes = /** @class */ (function () {
    function UserRoutes(userController) {
        this.userController = userController;
    }
    UserRoutes.prototype.registerToServer = function (server) {
        server.bind(this.userController);
        server.route({
            path: '/signUp',
            method: 'POST',
            handler: this.userController.createUser,
            options: {
                auth: false
            }
        });
        server.route({
            path: '/login',
            method: 'POST',
            handler: this.userController.login,
            options: {
                auth: false
            }
        });
    };
    return UserRoutes;
}());
exports.default = UserRoutes;
//# sourceMappingURL=UserRoutes.js.map