import config from '../config';

import * as client from 'knex';
import * as bs from 'bookshelf';

if (config.db.client === 'mysql') {
  console.log('Database connecting to %s at %s', config.db.connection.database, config.db.connection.host);
}
else if (config.db.client === 'sqlite3') {
  console.log('Using sqlite file %s', config.db.connection.filename);
}

export const defaultTableDef = { hidden: ['deleted_at'] };
export let knex: client = client(config.db);
export let bookshelf = bs(knex);
bookshelf.plugin('registry');
bookshelf.plugin('visibility');
bookshelf.plugin(require('bookshelf-eloquent'));

