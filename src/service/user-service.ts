import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'
import { NotFoundError } from 'routing-controllers'

import { User } from '../entity/User'

@Service()
export class UserService {
  @OrmRepository(User)
  private userRepository: Repository<User>

  public async getFullName (id: number): Promise<string> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundError('not found user')
    }
    return `${user.firstName} ${user.lastName}`
  }

  public async findOne (id: number): Promise<User> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundError('not found user')
    }

    return user
  }
}
