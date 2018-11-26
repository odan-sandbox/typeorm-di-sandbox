import 'reflect-metadata'
import { createConnection, useContainer as useContainerForOrm, Connection } from 'typeorm'
import { Container } from 'typedi'
import { useKoaServer, useContainer as useContainerForRouting } from 'routing-controllers'

import Koa from 'koa'
import logger from 'koa-logger'

import { User } from './entity/User'

const init = async (connection: Connection): Promise<void> => {
  {
    const user = new User()
    user.firstName = 'aaaa'
    user.lastName = 'bbbb'
    user.age = 18
    console.log(await connection.manager.save(user))
  }
  {
    const user = new User()
    user.firstName = 'cccc'
    user.lastName = 'dddd'
    user.age = 27
    console.log(await connection.manager.save(user))
  }
}

useContainerForOrm(Container)
useContainerForRouting(Container)

createConnection().then(async connection => {
  await init(connection)

  const app = new Koa()
  app.use(logger())

  useKoaServer(app, {
    controllers: [__dirname + '/controller/*.ts']
  })

  console.log('start listen')
  console.log(Container['globalInstance'].services)
  app.listen(3000)

}).catch(error => console.log(error))
