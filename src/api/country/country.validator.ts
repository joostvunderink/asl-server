const Joi = require('joi');

export class CountryValidator {
  schemaForInsert;
  schemaForUpdate;

  constructor() {
    let baseSchema = {
      name: Joi.string().min(4),
      code: Joi.string().regex(/^[a-z]{2}$/),
    };

    this.schemaForUpdate = Joi.object().keys(Object.assign({}, baseSchema));

    this.schemaForInsert = Joi.object().keys(Object.assign({}, {
      name: baseSchema.name.required(),
      code: baseSchema.code.required(),
    }));
  }

  validateForInsert(data) {
    return Joi.validate(data, this.schemaForInsert);
  }

  validateForUpdate(data) {
    return Joi.validate(data, this.schemaForUpdate);
  }
}

const v = new CountryValidator();
export default v;
