import Region from './region.model';
import BaseController from '../../core/base.controller';
import RegionValidator from './region.validator'

export class RegionController extends BaseController {
  constructor() {
    super();
    this.model = Region;
    this.validator = RegionValidator;
  }
}

const regionController = new RegionController();
export default regionController;