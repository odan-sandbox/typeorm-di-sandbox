import 'reflect-metadata'
import { useContainer as useContainerForOrm, Connection, ConnectionManager } from 'typeorm'
import { Container } from 'typedi'
import createMockInstance from 'jest-create-mock-instance'

import { User } from './entity/User'
import { UserService } from './service/user-service'

class MockUserRepository {
  findOne (id: number): User | undefined {
    console.log('poyo', id)
    return { id, firstName: 'nanashino', lastName: 'gobe', age: 9 } as User
  }
}

const mockConnection = createMockInstance(Connection)
mockConnection.getRepository.mockReturnValueOnce(new MockUserRepository())
const manager = {
  has () {
    return true
  },
  get () {
    return mockConnection
  }
}

useContainerForOrm(Container)
Container.set(ConnectionManager, manager)

describe('poyo', () => {
  it('test 1', async () => {
    const userService = Container.get(UserService)
    expect(await userService.getFullName(1)).toEqual('nanashino gobe')
  })
})
