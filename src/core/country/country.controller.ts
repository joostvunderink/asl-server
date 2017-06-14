import Country from './country.model';

export class CountryController {

  constructor() {
  }

  public getAll() {
    return Country.fetchAll();
  }

}

const countryController = new CountryController();
export default countryController;