import * as Hapi from 'hapi'
import * as Joi from 'joi'

import { IRoutes } from '../../types/routes'
import UserController from './UserController'

export default class UserRoutes implements IRoutes {
  constructor(private userController: UserController) {}
  public registerToServer(server: Hapi.Server) {
    server.bind(this.userController)

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
    })

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
    })

    server.route({
      path: '/register',
      method: 'POST',
      handler: this.userController.createUser,
      options: {
        auth: false,
        validate: {
          payload: {
            email: Joi.string().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            address: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            cityId: Joi.number().required(),
            countryId: Joi.number().required(),
            districtId: Joi.number().required()
          }
        },
        tags: ['api', 'register'],
        description: 'Register new user'
      }
    })

    server.route({
      path: '/login',
      method: 'POST',
      handler: this.userController.login,
      options: {
        auth: false
      }
    })
  }
}
