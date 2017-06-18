import Region from './region.model';
import BaseController from '../../core/base.controller';

export class RegionController extends BaseController {
  constructor() {
    super();
    this.model = Region;
  }
}

const regionController = new RegionController();
export default regionController;