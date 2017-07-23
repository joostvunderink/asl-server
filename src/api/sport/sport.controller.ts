import Sport from './sport.model';
import BaseController from '../../core/base.controller';
import SportValidator from './sport.validator'

export class SportController extends BaseController {
  constructor() {
    super();
    this.model = Sport;
    this.validator = SportValidator;
  }
}

const sportController = new SportController();
export default sportController;
