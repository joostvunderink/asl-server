const Joi = require('joi');

export class CountryValidator {
  schema;

  constructor() {
    this.schema = Joi.object().keys({
      code: Joi.string().regex(/^[a-z]{2}$/).required(),
      name: Joi.string().min(4).required(),
    });
  }

  validate(data) {
    return Joi.validate(data, this.schema);
  }
}

const v = new CountryValidator();
export default v;
