import CompetitionTeam from './competition-team.model';
import BaseController from '../../core/base.controller';

export class CompetitionTeamController extends BaseController {
  constructor() {
    super();
    this.model = CompetitionTeam;
  }
}

const competitionTeamController = new CompetitionTeamController();
export default competitionTeamController;