import Country from './country.model';
import BaseController from '../base.controller';

export class CountryController extends BaseController {
  constructor() {
    super();
    this.model = Country;
  }
}

const countryController = new CountryController();
export default countryController;