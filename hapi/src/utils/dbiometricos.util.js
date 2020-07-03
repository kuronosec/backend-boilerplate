const eosUtil = require('./eos.util')

const CONTRACT_NAME = 'dbiometricos'

const registramsp = async (
  account,
  password,
  {
    json_data: jsonData,
    created_at: createdAt,
    updated_at: updatedAt,
    project_id: projectId,
    ...payload
  }
) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: CONTRACT_NAME,
        name: 'registraedus',
        data: {
          ...payload,
          json_data: JSON.stringify(jsonData),
          hash_result:
            '2ccad427228bae530d3afba0150a3f105b7fe9d9d095e15d8380d597badbe48a',
          created_at: Math.floor(new Date(createdAt).getTime() / 1000),
          updated_at: Math.floor(new Date(updatedAt).getTime() / 1000),
          proyect_id: projectId
        }
      }
    ],
    account,
    password
  )
}

module.exports = {
  registramsp
}
