import Team from './team.model';
import BaseController from '../../core/base.controller';

export class TeamController extends BaseController {
  constructor() {
    super();
    this.model = Team;
  }
}

const teamController = new TeamController();
export default teamController;