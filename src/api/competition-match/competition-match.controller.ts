import CompetitionMatch from './competition-match.model';
import BaseController from '../../core/base.controller';

export class CompetitionMatchController extends BaseController {
  constructor() {
    super();
    this.model = CompetitionMatch;
  }
}

const competitionMatchController = new CompetitionMatchController();
export default competitionMatchController;