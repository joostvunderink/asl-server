const Joi = require('joi');

export class SportValidator {
  schemaForInsert;
  schemaForUpdate;

  constructor() {
    let baseSchema = {
      name       : Joi.string().min(4),
      description: Joi.string().min(1),
    };

    this.schemaForUpdate = Joi.object().keys(Object.assign({}, baseSchema));

    this.schemaForInsert = Joi.object().keys(Object.assign({}, {
      name       : baseSchema.name.required(),
      description: baseSchema.description.required(),
    }));
  }

  validateForInsert(data) {
    return Joi.validate(data, this.schemaForInsert);
  }

  validateForUpdate(data) {
    return Joi.validate(data, this.schemaForUpdate);
  }
}

const v = new SportValidator();
export default v;
