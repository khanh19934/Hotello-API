export default {
  API: {
    HOST: process.env.HOST || '0.0.0.0',
    PORT: process.env.PORT || 3030
  },
  DATABASE: {
    TYPE: 'mysql',
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 3306,
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'khanh1993',
    NAME: process.env.DB_NAME || 'hotello',
    CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT || 10
  },
  TOKEN: {
    SECRET_KEY: '23423523fdvfdghjre234kdnsbgjksdbgkdbsk'
  },
  OTP: {
    SECRET_KEY: 'jnveirbiu34834yg2gbdieufi9372rg283gd!#@#$!'
  },
  SEND_GRID: {
    API_KEY: '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'
  }
}
