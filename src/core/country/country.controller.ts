import Country from './country.model';

export class CountryController {

  constructor() {
  }

  public getAll() {
    return Country.fetchAll();
  }

  public getOne(id) {
    return Country.where('id', id).fetch();
  }

}

const countryController = new CountryController();
export default countryController;