const Hapi = require('@hapi/hapi')
const { serverConfig } = require('./config')
const routes = require('./routes')

let server = null

const init = async () => {
  if (server) {
    return server
  }

  server = Hapi.server({
    port: serverConfig.port,
    host: serverConfig.host
  })
  server.route(routes)
  await server.start()
  console.info(`Server running on ${server.info.uri}`)
  server
    .table()
    .forEach((route) => console.log(`${route.method}\t${route.path}`))

  return server
}

const getInstance = () => server

module.exports = {
  init,
  getInstance
}
