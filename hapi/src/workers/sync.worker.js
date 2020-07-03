const { syncConfig } = require('../config')
const { recordTrackingService } = require('../services')

const start = async () => {
  console.log('sync.worker started')
  await recordTrackingService.sync()
  setTimeout(start, syncConfig.interval * 1000)
  console.log('sync.worker ended')
  console.log('_______________')
}

module.exports = {
  start
}
