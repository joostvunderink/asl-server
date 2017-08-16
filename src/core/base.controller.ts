import logger from '../logger';
import { InvalidInputError } from '../error';

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
    })
    .catch(err => {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        const m = err.message.match(/FOREIGN KEY \(`([^`]+)`\) REFERENCES `([^`]+)`/);
        if (m) {
          const fieldName = m[1];
          const tableName = m[2];
          throw new InvalidInputError({
            message: 'Field "' + fieldName + '" contains a reference to object ' +
                     tableName + ':' + data[fieldName] + '. This object either does not ' +
                     'exist or you have no permission to read it.',
            statusCode: 400,
            data: {
              field: fieldName,
              value: data[fieldName],
            }
          })
        }
      }
      else if (err.code === 'ER_DUP_ENTRY') {
        // insert into `country` (`code`, `name`) values ('xy', 'Duplication Country 1') - 
        // ER_DUP_ENTRY: Duplicate entry 'Duplication Country 1' for key 'country_name_unique'
        const m = err.message.match(/insert into `([^`]+)` .* ER_DUP_ENTRY: Duplicate entry '(.*)' for key/);
        if (m) {
          const tableName = m[1];
          const value = m[2];
          throw new InvalidInputError({
            message: tableName + ' with value ' + value + 'already exists.',
            statusCode: 400,
            data: {
              value: value,
              tableName: tableName,
            }
          })
        }
        throw err;
      }
      throw err;
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
