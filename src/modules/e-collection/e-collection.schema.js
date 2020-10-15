const Joi = require("@hapi/joi");

const collectData = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().optional(),
  email: Joi.string().email().required(),
  birth_date: Joi.date().required(),
  age: Joi.number().integer().min(18).max(65).required(),
  familyMembers: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      relationship: Joi.string().required(),
      age: Joi.number().integer().required(),
    })
  ).required(),
});

module.exports = {
  collectData
}
