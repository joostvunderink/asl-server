import UserRole from './user-role.model';
import BaseController from '../../core/base.controller';

export class UserRoleController extends BaseController {
  constructor() {
    super();
    this.model = UserRole;
  }
}

const userRoleController = new UserRoleController();
export default userRoleController;