import * as Hapi from 'hapi'
import * as hapiJwt from 'hapi-auth-jwt2'
import { createConnection } from 'typeorm'

import configs from './configs'
import * as Configs from './configs/index'
import Constants from './constants/Constants'
import Users from './entities/Users'
import { IPlugin } from './plugins/swagger'
import routeResolver from './routeResolver'
import { validateUserId } from './utils/common'

const newServer = new Hapi.Server({
  port: configs.API.PORT,
  host: configs.API.HOST,
  routes: {
    cors: true
  }
})

const serverConfigs = Configs.getServerConfigs()

const init = async (server: Hapi.Server) => {
  try {
    const connection = await createConnection({
      type: 'mysql',
      host: configs.DATABASE.HOST,
      port: configs.DATABASE.PORT as any,
      username: configs.DATABASE.USER,
      password: configs.DATABASE.PASSWORD,
      database: configs.DATABASE.NAME,
      synchronize: false,
      entities: [`${__dirname}/entities/*`],
      migrations: [`${__dirname}/migration/*`]
    })

    const plugins = serverConfigs.plugins

    const pluginPromises: Array<Promise<any>> = []

    plugins.forEach((pluginName: string) => {
      const plugin: IPlugin = require(`./plugins/${pluginName}`).default()
      console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`)
      pluginPromises.push(plugin.register(server))
    })

    await Promise.all(pluginPromises)

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
