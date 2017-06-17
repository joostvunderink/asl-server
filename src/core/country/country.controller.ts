import Country from './country.model';
import BaseController from '../base.controller';
import CountryValidator from './country.validator'

export class CountryController extends BaseController {
  constructor() {
    super();
    this.model = Country;
    this.validator = CountryValidator;
  }
}

const countryController = new CountryController();
export default countryController;