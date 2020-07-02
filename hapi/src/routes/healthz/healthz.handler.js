const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

module.exports = async () => {
  try {
    return 'OK'
  } catch (error) {
    console.error('healthz.handler', error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
