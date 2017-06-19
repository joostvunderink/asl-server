import CompetitionTemplate from './competition-template.model';
import BaseController from '../../core/base.controller';

export class CompetitionTemplateController extends BaseController {
  constructor() {
    super();
    this.model = CompetitionTemplate;
  }
}

const clubController = new CompetitionTemplateController();
export default clubController;