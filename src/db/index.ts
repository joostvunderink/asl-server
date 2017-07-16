import { config } from '../config';

import * as _ from 'lodash';
import * as client from 'knex';
import * as bs from 'bookshelf';

if (config.db.client === 'mysql') {
  console.log('Database connecting to %s at %s', config.db.connection.database, config.db.connection.host);
}

export const defaultTableDef = { hidden: ['deleted_at'] };
export let knex: client = client(config.db);
export let bookshelf = bs(knex);
bookshelf.plugin('registry');
bookshelf.plugin('visibility');
bookshelf.plugin(require('bookshelf-eloquent'));

export function aslModel(modelName, tableName, definition) {
  let def = definition;
  def.tableName = tableName;
  if (def.hidden) {
    def.hidden.push('deleted_at');
  }
  else {
    def.hidden = ['deleted_at'];
  }
  let m = bookshelf.model(modelName, def);
  m.tableName = tableName;
  return m;
}
