const Joi = require('joi');

export class RegionValidator {
  schemaForInsert;
  schemaForUpdate;

  constructor() {
    let baseSchema = {
      name       : Joi.string().min(1),
      description: Joi.string(),
      country_id : Joi.number().integer().min(1),
      sport_id   : Joi.number().integer().min(1),
    };

    this.schemaForUpdate = Joi.object().keys(Object.assign({}, baseSchema));

    this.schemaForInsert = Joi.object().keys(Object.assign({}, {
      name       : baseSchema.name.required(),
      description: baseSchema.description,
      country_id : baseSchema.country_id.required(),
      sport_id   : baseSchema.sport_id.required(),
    }));
  }

  validateForInsert(data) {
    return Joi.validate(data, this.schemaForInsert);
  }

  validateForUpdate(data) {
    return Joi.validate(data, this.schemaForUpdate);
  }
}

const v = new RegionValidator();
export default v;
