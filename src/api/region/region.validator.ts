const Joi = require('joi');
import BaseValidator from '../../core/base.validator';

export class RegionValidator extends BaseValidator {
  constructor() {
    super();
    this.baseSchema = {
      name       : Joi.string().min(1),
      description: Joi.string(),
      country_id : Joi.number().integer().min(1),
      sport_id   : Joi.number().integer().min(1),
    };

    this.schemaForUpdate = Joi.object().keys(Object.assign({}, this.baseSchema));

    this.schemaForInsert = Joi.object().keys(Object.assign({}, {
      name       : this.baseSchema.name.required(),
      description: this.baseSchema.description,
      country_id : this.baseSchema.country_id.required(),
      sport_id   : this.baseSchema.sport_id.required(),
    }));
  }
}

const v = new RegionValidator();
export default v;
