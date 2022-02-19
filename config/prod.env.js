'use strict'
const dotenv = require('dotenv')
const env = dotenv.config().parsed

module.exports = {
  NODE_ENV: '"production"',
  API_KEY_KAKAO_MAP: JSON.stringify(env.API_KEY_KAKAO_MAP_PROD),
  R_URL: JSON.stringify(env.R_URL_PROD)
}
