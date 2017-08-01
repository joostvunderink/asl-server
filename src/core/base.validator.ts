const Joi = require('joi');

export default class BaseValidator {
  baseSchema;
  schemaForInsert;
  schemaForUpdate;

  validateForInsert(data) {
    return Joi.validate(data, this.schemaForInsert);
  }

  validateForUpdate(data) {
    return Joi.validate(data, this.schemaForUpdate);
  }
}