import CompetitionRound from './competition-round.model';
import BaseController from '../../core/base.controller';

export class CompetitionRoundController extends BaseController {
  constructor() {
    super();
    this.model = CompetitionRound;
  }
}

const competitionRoundController = new CompetitionRoundController();
export default competitionRoundController;