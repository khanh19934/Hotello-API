import { isNilOrEmpty } from 'ramda-adjunct'
import { Repository } from 'typeorm'

import { INewUserPayload } from '../api/users/UserController'
import Users from '../entities/Users'
import { comparePassword } from '../utils/common'

export interface IUserServices {
  createUser(user: INewUserPayload): Promise<any>
  loginUserServices(payload: { email: string; password: string }): Promise<any>
}

export default class UserServices implements IUserServices {
  constructor(private userRepository: Repository<Users>) {}

  public async createUser(payload: INewUserPayload) {
    const existedUser = await this.userRepository.findOne({ where: { email: payload.email } })

    console.log(existedUser)

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
}
