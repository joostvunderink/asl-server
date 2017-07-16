import Permission from './permission.model';
import BaseController from '../../core/base.controller';

export class PermissionController extends BaseController {
  constructor() {
    super();
    this.model = Permission;
  }
}

const permissionController = new PermissionController();
export default permissionController;