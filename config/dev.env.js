'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const dotenv = require('dotenv')
const env = dotenv.config().parsed

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_LOCAL_API_KEY: JSON.stringify(env.VUE_APP_LOCAL_API_KEY)
})
