import User from './user.model';
import BaseController from '../../core/base.controller';

export class UserController extends BaseController {
  constructor() {
    super();
    this.model = User;
  }
}

const userController = new UserController();
export default userController;