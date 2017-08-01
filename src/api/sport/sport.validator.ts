const Joi = require('joi');
import BaseValidator from '../../core/base.validator';

export class SportValidator extends BaseValidator{
  constructor() {
    super();
    this.baseSchema = {
      name       : Joi.string().min(4),
      description: Joi.string().min(1),
    };

    this.schemaForUpdate = Joi.object().keys(Object.assign({}, this.baseSchema));

    this.schemaForInsert = Joi.object().keys(Object.assign({}, {
      name       : this.baseSchema.name.required(),
      description: this.baseSchema.description.required(),
    }));
  }
}

const v = new SportValidator();
export default v;
