import * as Hapi from 'hapi'
import * as hapiJwt from 'hapi-auth-jwt2'

import { createConnection } from 'typeorm'
import configs from './configs'
import Constants from './constants/Constants'
import Users from './entities/Users'
import routeResolver from './routeResolver'
import { validateUserId } from './utils/common'

const newServer = new Hapi.Server({
  port: configs.API.PORT,
  host: configs.API.HOST,
  routes: {
    cors: true
  }
})

const init = async (server: Hapi.Server) => {
  try {
    const connection = await createConnection({
      type: 'mysql',
      host: configs.DATABASE.HOST,
      port: configs.DATABASE.PORT as any,
      username: configs.DATABASE.USER,
      password: configs.DATABASE.PASSWORD,
      database: configs.DATABASE.NAME,
      entities: [`${__dirname}/entities/*`]
    })

    await server.register([hapiJwt])

    const userRepo = connection.getRepository(Users)

    server.auth.strategy('jwt', 'jwt', {
      key: Constants.TOKEN_SECRET_KEY,
      validate: validateUserId(userRepo),
      verifyOptions: { algorithms: ['HS256'] }
    })

    server.auth.default('jwt')

    const routes = routeResolver(connection)
    for (const route of routes) {
      route.registerToServer(server)
    }

    server.start().then(() => console.log(`Server is running in ${server.info.uri}`))
  } catch (e) {
    throw e
  }
}

init(newServer)
