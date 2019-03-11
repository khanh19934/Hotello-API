import * as nconf from 'nconf'
import * as path from 'path'
import { IServerConfigurations } from '../plugins/swagger'

const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: 'file',
    file: path.join(__dirname, `./configs.${process.env.NODE_ENV || 'dev'}.json`)
  }
})

export const getServerConfigs = (): IServerConfigurations => ({ plugins: ['swagger'] })
