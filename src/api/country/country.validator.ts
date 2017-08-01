const Joi = require('joi');
import BaseValidator from '../../core/base.validator';

export class CountryValidator extends BaseValidator {

  constructor() {
    super();
    this.baseSchema = {
      name: Joi.string().min(4),
      code: Joi.string().regex(/^[a-z]{2}$/),
    };

    this.schemaForUpdate = Joi.object().keys(Object.assign({}, this.baseSchema));

    this.schemaForInsert = Joi.object().keys(Object.assign({}, {
      name: this.baseSchema.name.required(),
      code: this.baseSchema.code.required(),
    }));
  }
}

const v = new CountryValidator();
export default v;
