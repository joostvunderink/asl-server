import Competition from './competition.model';
import BaseController from '../../core/base.controller';

export class CompetitionController extends BaseController {
  constructor() {
    super();
    this.model = Competition;
  }
}

const clubController = new CompetitionController();
export default clubController;