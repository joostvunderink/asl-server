import Sport from './sport.model';
import BaseController from '../../core/base.controller';

export class SportController extends BaseController {
  constructor() {
    super();
    this.model = Sport;
  }
}

const sportController = new SportController();
export default sportController;
