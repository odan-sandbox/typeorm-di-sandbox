import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { NotFoundError } from 'routing-controllers'

import { User } from '../entity/User'

@Service()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>

  public async getFullName (id: number): Promise<string> {
    console.log(this.userRepository)
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
