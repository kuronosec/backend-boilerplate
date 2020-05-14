const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    user_name: Joi.string().required(),
    password: Joi.string().required()
  })
}
