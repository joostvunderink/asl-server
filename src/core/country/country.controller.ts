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

  public create(data) {
    return new Country(data).save()
    .then((savedCountry) => {
      return this.getOne(savedCountry.id);
    });
  }
}

const countryController = new CountryController();
export default countryController;