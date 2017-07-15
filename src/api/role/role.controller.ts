import Role from './role.model';
import BaseController from '../../core/base.controller';

export class RoleController extends BaseController {
  constructor() {
    super();
    this.model = Role;
  }
}

const roleController = new RoleController();
export default roleController;