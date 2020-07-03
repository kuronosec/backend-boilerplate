const { syncConfig } = require('../config')
const { hasuraUtil, dbiometricosUtil } = require('../utils')

const FIND = `
  query ($where: record_tracking_bool_exp) {
    record_tracking(where: $where) {
      id
      json_data
      hash_result
      created_at
      updated_at
      user_reference
      project_id
    }
  }
`

const UPDATE = `
  mutation ($where: record_tracking_bool_exp!, $set: record_tracking_set_input) {
    update_record_tracking(where: $where, _set: $set) {
      affected_rows
    }
  }
`

const find = async where => {
  const data = await hasuraUtil.request(FIND, { where })

  return data.record_tracking
}

const update = async (where, set) => {
  const data = await hasuraUtil.request(UPDATE, { where, set })

  return data.update_record_tracking
}

const sync = async () => {
  const pendingRecords = await find({ hash_result: { _is_null: true } })
  console.log(`${pendingRecords.length} pending records`)
  for (let index = 0; index < pendingRecords.length; index++) {
    const record = pendingRecords[index]
    try {
      const {
        transaction_id: transactionId
      } = await dbiometricosUtil.registramsp(
        syncConfig.account,
        syncConfig.accountPassword,
        record
      )
      await update({ id: { _eq: record.id } }, { hash_result: transactionId })
      console.log(`record.id ${record.id} was processed`)
    } catch (error) {
      console.log(`error processing record.id ${record.id} `)
      console.error('record-tracking.service.sync', error)
    }
  }
}

module.exports = {
  find,
  update,
  sync
}
