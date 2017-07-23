const { knex, bookshelf, defaultTableDef } = require('../db');
import { PermissionDeniedError } from '../error';

export function can(args) {
  let { user, model, operation } = args;
  return knex('permission')
        .where('model', model)
        .where('operation', operation)
        .whereIn('role_id', user.roleIds)
  .then(res => {
    if (res.length === 0) {
      throw new PermissionDeniedError({
        message: 'Permission denied for ' + model + ':' + operation,
        data: {
          model: model,
          operation: operation,
        }
      });
    }
  });
}