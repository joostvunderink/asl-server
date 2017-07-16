const { knex, bookshelf, defaultTableDef } = require('../db');

export function can(roleIds, model, operation) {
  return knex('permission')
        .where('model', model)
        .where('operation', operation)
        .whereIn('role_id', roleIds)
  .then(res => {
    if (res.length === 0) {
      throw new Error('Permission denied');
    }
  });
}