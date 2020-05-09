const Sequelize = require('sequelize')
const { dadabaseConfig } = require('./config')
const models = require('./models')

let sequelize = null

const init = async () => {
  if (sequelize) {
    return sequelize
  }

  sequelize = new Sequelize(dadabaseConfig.DATABASE_URL, {
    dialect: dadabaseConfig.dialect,
    pool: {
      max: dadabaseConfig.pool.max,
      min: dadabaseConfig.pool.min,
      acquire: dadabaseConfig.pool.acquire,
      idle: dadabaseConfig.pool.idle
    }
  })

  models.forEach((model) => {
    model(sequelize)
  })

  await sequelize.authenticate()
  console.info(`Connected to ${dadabaseConfig.DATABASE_URL}`)

  return sequelize
}

const getInstance = () => sequelize

const getModel = (name) => sequelize.models[name]

module.exports = {
  init,
  getInstance,
  getModel
}
