"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var UserRoutes = /** @class */ (function () {
    function UserRoutes(userController) {
        this.userController = userController;
    }
    UserRoutes.prototype.registerToServer = function (server) {
        server.bind(this.userController);
        server.route({
            path: '/register/request-otp',
            method: 'POST',
            handler: this.userController.requestOTP,
            options: {
                auth: false,
                validate: {
                    payload: {
                        email: Joi.string()
                            .email()
                            .required(),
                        first_name: Joi.string().required(),
                        last_name: Joi.string().required()
                    }
                },
                tags: ['api', 'register'],
                description: 'Request OTP code via email for submit register'
            }
        });
        server.route({
            path: '/register/validate-otp',
            method: 'POST',
            handler: this.userController.validateOTP,
            options: {
                auth: false,
                validate: {
                    payload: {
                        otpCode: Joi.string()
                            .max(6)
                            .required()
                    }
                },
                tags: ['api', 'register'],
                description: 'Validate OTP code for submit register'
            }
        });
        server.route({
            path: '/register',
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