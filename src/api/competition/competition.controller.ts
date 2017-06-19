import Competition from './competition.model';
import BaseController from '../../core/base.controller';

export class CompetitionController extends BaseController {
  constructor() {
    super();
    this.model = Competition;
  }
}

const competitionController = new CompetitionController();
export default competitionController;