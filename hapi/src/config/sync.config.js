module.exports = {
  interval: parseInt(process.env.SYNC_PROCESS_INTERVAL || 10),
  account: process.env.SYNC_PROCESS_ACCOUNT,
  accountPassword: process.env.SYNC_PROCESS_ACCOUNT_PASSWORD
}
