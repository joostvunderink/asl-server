const Joi = require('joi');

export class CountryValidator {
  schema;

  constructor() {
    this.schema = Joi.object().keys({
      code: Joi.string().regex(/^[a-z]{2}$/),
      name: Joi.string(),
    });
  }

  validate(data) {
    return Joi.validate(data, this.schema);
  }
}

const v = new CountryValidator();
export default v;
