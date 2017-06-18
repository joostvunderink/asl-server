import Club from './club.model';
import BaseController from '../../core/base.controller';

export class ClubController extends BaseController {
  constructor() {
    super();
    this.model = Club;
  }
}

const clubController = new ClubController();
export default clubController;