const Joi = require('joi');

export class SportValidator {
  schema;

  constructor() {
    this.schema = Joi.object().keys({
      name: Joi.string().min(1).required(),
      description: Joi.string(),
    });
  }

  validate(data) {
    return Joi.validate(data, this.schema);
  }
}

const v = new SportValidator();
export default v;
