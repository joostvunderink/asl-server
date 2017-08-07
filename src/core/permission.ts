const { knex, bookshelf, defaultTableDef } = require('../db');
import { PermissionDeniedError } from '../error';
import logger from '../logger';

export function can(args) {
  let { user, model, operation } = args;
  logger.debug({ user_id: user.id, user_role_ids: user.roleIds.join(';'), model, operation }, 'Permission check');
  return knex('permission')
        .where('model', model)
        .where('operation', operation)
        .whereIn('role_id', user.roleIds)
  .then(res => {
    if (res.length === 0) {
      logger.warn({ user_id: user.id, user_role_ids: user.roleIds.join(';'), model, operation }, 'Permission denied');
      throw new PermissionDeniedError({
        message: 'Permission denied for ' + model + ':' + operation,
        data: {
          model: model,
          operation: operation,
        }
      });
    }
    logger.debug({ user_id: user.id, user_role_ids: user.roleIds.join(';'), model, operation }, 'Permission granted');
  });
}