'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const dotenv = require('dotenv')
const env = dotenv.config().parsed

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY_KAKAO_MAP: JSON.stringify(env.API_KEY_KAKAO_MAP_LOCAL),
  R_URL: JSON.stringify(env.R_URL_LOCAL)
})
