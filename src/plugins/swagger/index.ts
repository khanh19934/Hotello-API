import * as Hapi from 'hapi'
import * as HapiSwagger from 'hapi-swagger'
import * as Inert from 'inert'
import * as Vision from 'vision'

export interface IServerConfigurations {
  plugins: string[]
}

export interface IPluginOptions {
  serverConfigs: IServerConfigurations
}

export interface IPlugin {
  register(server: Hapi.Server, options?: IPluginOptions): Promise<void>
  info(): IPluginInfo
}

export interface IPluginInfo {
  name: string
  version: string
}

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: 'Hotello Api',
            description: 'Hotello Api Documentation',
            version: '1.0'
          },
          securityDefinitions: {
            jwt: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
            }
          },
          security: [{ jwt: [] }],
          tags: [
            {
              name: 'tasks',
              description: 'Api tasks interface.'
            },
            {
              name: 'users',
              description: 'Api users interface.'
            }
          ],
          swaggerUI: true,
          documentationPage: true,
          documentationPath: '/docs'
        }
      }
    ])
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`)
  }
}

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: 'Swagger Documentation', version: '1.0.0' }
    }
  }
}
