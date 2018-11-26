import { JsonController, Param, Get } from 'routing-controllers'
import { Inject } from 'typedi'

import { UserService } from '../service/user-service'
import { User } from '../entity/User'

@JsonController('/user')
export class UserController {
  @Inject()
  userService?: UserService

  @Get('/:id')
	getOne (@Param('id') id: number): Promise<User> {
    return this.userService!.findOne(id)
  }

  @Get('/:id/fullname')
  async getFullName (@Param('id') id: number): Promise<{fullname: string}> {
    const fullname = await this.userService!.getFullName(id)
    return { fullname }
  }
}
