import config from '../config';

import * as client from 'knex';
import * as bs from 'bookshelf';

console.log('Database connecting to %s at %s', config.db.connection.database, config.db.connection.host);

export let knex: client = client(config.db);
export let bookshelf = bs(knex);
