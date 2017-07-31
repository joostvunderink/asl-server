const whereFilter = require('knex-filter-loopback').whereFilter;

export default class BaseController {
  model;
  validator;

  constructor() {
  }

  public getAll(options) {
    let query = this.model.where('deleted_at', null);

    if (options.filter && options.filter.where) {
      query.where(whereFilter(options.filter.where));
    }

    if (options.filter && options.filter.order) {
      const orderFilter = Array.isArray(options.filter.order) ? options.filter.order : [options.filter.order];
      orderFilter.forEach(item => {
        const arr = item.split(/ +/);
        query.query(function(qb){
          qb.orderBy(arr[0], arr[1]); 
        });
      });
    }

    if (options.filter && options.filter.limit) {
      query.query(function(qb) {
        qb.limit(options.filter.limit);
      });
    }

    if (options.filter && options.filter.skip) {
      query.query(function(qb) {
        qb.offset(options.filter.skip);
      });
    }

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
    if (this.validator) {
      let { error, validatedData } = this.validator.validateForInsert(data);

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
    if (this.validator) {
      let { error, validatedData } = this.validator.validateForUpdate(data);

      if (error) {
        return Promise.reject(error);
      }
    }
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

  public count(options) {
    let query = this.model.where('deleted_at', null);
    if (options.where) {
      query.where(whereFilter(options.where));
    }
    return query.count();
  }
}
