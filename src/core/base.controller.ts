import FilterParser from './filter.parser';

const fp = new FilterParser();

export default class BaseController {
  model;
  validator;

  constructor() {
  }

  public getAll(options) {
    let query = this.model.where('deleted_at', null);

    fp.apply(query, options.filter);

    let fetchOptions = {
      withRelated: []
    };
    if (options.filter && options.filter.include) {
      fetchOptions.withRelated = options.filter.include;
    }

    return query.fetchAll(fetchOptions);
  }

  public getOne(options) {
    const id = options.id;
    let query = this.model.where('id', id).where('deleted_at', null);
    let fetchOptions = {
      require: true,
      withRelated: [],
    };

    if (options.filter && options.filter.include) {
      fetchOptions.withRelated = options.filter.include;
    }

    return query.fetch(fetchOptions);
  }

  public create(data) {
    let validatedData;
    if (this.validator) {
      let { error, validatedData } = this.validator.validate(data);

      if (error) {
        return Promise.reject(error);
      }
    }
    return new this.model(data).save()
    .then((savedObj) => {
      return this.getOne({ id: savedObj.id });
    });
  }

  public update(id, data) {
    return this.getOne({ id: id })
    .then((foundObj) => {
      for (const key in data) {
        foundObj.set(key, data[key]);
      }
      foundObj.set('updated_at', new Date());
      return foundObj.save();
    })
    .then((savedObj) => {
      return this.getOne({ id: savedObj.id });
    });
  }

  public delete(id) {
    return this.getOne({ id: id })
    .then((foundObj) => {
      foundObj.set('deleted_at', new Date());
      return foundObj.save();
    })
    .then(() => {
      return;
    });
  }
}
