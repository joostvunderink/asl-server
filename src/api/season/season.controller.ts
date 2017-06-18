import Season from './season.model';
import BaseController from '../../core/base.controller';

export class SeasonController extends BaseController {
  constructor() {
    super();
    this.model = Season;
  }
}

const seasonController = new SeasonController();
export default seasonController;