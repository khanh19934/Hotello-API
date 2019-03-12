import * as sgMail from '@sendgrid/mail'
import { isNilOrEmpty } from 'ramda-adjunct'
import { Repository } from 'typeorm'

import { INewUserPayload } from '../api/users/UserController'
import configs from '../configs'
import Users from '../entities/Users'
import { comparePassword, generateOTPCode } from '../utils/common'

export interface IUserServices {
  createUser(user: INewUserPayload): Promise<any>
  loginUserServices(payload: { email: string; password: string }): Promise<any>
  activeUser(payload: { id: number }): Promise<any>
  requestOTPServices(id: number): Promise<any>
}

export default class UserServices implements IUserServices {
  constructor(private userRepository: Repository<Users>) {}

  public async createUser(payload: INewUserPayload) {
    const existedUser = await this.userRepository.findOne({ where: { email: payload.email } })

    if (!isNilOrEmpty(existedUser)) {
      throw new Error('User is existed')
    }
    const newUser = new Users()

    newUser.email = payload.email
    newUser.password = payload.password
    newUser.firstName = payload.firstName
    newUser.address = payload.address
    newUser.phoneNumber = payload.phoneNumber
    newUser.lastName = payload.lastName
    newUser.cityId = payload.cityId
    newUser.countryId = payload.countryId
    newUser.districtId = payload.districtId

    return this.userRepository.save(newUser)
  }

  public async loginUserServices({ email, password }: INewUserPayload) {
    const res = await this.userRepository.findOne({ where: { email } })

    return { isValid: await comparePassword(password, res.password), id: res.id }
  }

  public async requestOTPServices(id: number) {
    try {
      const res = await this.userRepository.findOne(id)

      const otpCode = generateOTPCode()

      sgMail.setApiKey(configs.SEND_GRID.API_KEY)

      const { email, firstName, lastName } = res
      const fullName = `${firstName} ${lastName}`

      const msg = {
        to: email,
        // To do: will change this email when have original email
        from: 'khanh19934@gmail.com',
        subject: 'Hotello Active Code',
        text: 'Hotello Active code',
        templateId: configs.SEND_GRID.TEMPLATE_ID,
        dynamic_template_data: {
          fullName,
          otp: otpCode
        }
      }

      sgMail.send(msg)

      return true
    } catch (e) {
      return false
    }
  }

  public async activeUser({ id }: { id: number }) {
    return this.userRepository.update(id, { isActive: true })
  }
}
