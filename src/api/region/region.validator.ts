const Joi = require('joi');

export class RegionValidator {
  schema;

  constructor() {
    this.schema = Joi.object().keys({
      name       : Joi.string().min(1).required(),
      description: Joi.string(),
      country_id : Joi.number().integer().min(1).required(),
      sport_id   : Joi.number().integer().min(1).required(),
    });
  }

  validate(data) {
    return Joi.validate(data, this.schema);
  }
}

const v = new RegionValidator();
export default v;
