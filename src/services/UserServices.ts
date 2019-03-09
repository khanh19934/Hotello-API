import { Repository } from 'typeorm'
import { INewUserPayload } from '../api/users/UserController'
import Users from '../entities/Users'
import { comparePassword } from '../utils/common'

export interface IUserServices {
  createUser(user: INewUserPayload): Promise<any>
  loginUserServices(payload: INewUserPayload): Promise<any>
}

export default class UserServices implements IUserServices {
  constructor(private userRepository: Repository<Users>) {}

  public async createUser(payload: INewUserPayload) {
    const newUser = new Users()

    newUser.email = payload.email
    newUser.password = payload.password

    return this.userRepository.save(newUser)
  }

  public async loginUserServices({ email, password }: INewUserPayload) {
    const res = await this.userRepository.findOne({ where: { email } })

    return { isValid: await comparePassword(password, res.password), id: res.id }
  }
}
