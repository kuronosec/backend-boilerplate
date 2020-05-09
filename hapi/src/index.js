const database = require('./database')
const server = require('./server')

const init = async () => {
  await database.init()
  await server.init()
}

init()
