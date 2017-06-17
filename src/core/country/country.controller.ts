import Country from './country.model';

export class CountryController {

  constructor() {
  }

  public getAll() {
    return Country.where('deleted_at', null).fetchAll();
  }

  public getOne(id) {
    return Country.where('id', id).where('deleted_at', null).fetch({ require: true });
  }

  public create(data) {
    return new Country(data).save()
    .then((savedCountry) => {
      return this.getOne(savedCountry.id);
    });
  }

  public update(id, data) {
    return this.getOne(id)
    .then((foundCountry) => {
      for (const key in data) {
        foundCountry.set(key, data[key]);
      }
      foundCountry.set('updated_at', new Date());
      return foundCountry.save();
    })
    .then((savedCountry) => {
      return this.getOne(savedCountry.id);
    });
  }

  public delete(id) {
    return this.getOne(id)
    .then((foundCountry) => {
      foundCountry.set('deleted_at', new Date());
      return foundCountry.save();
    })
    .then((savedCountry) => {
      return;
    });
  }
}

const countryController = new CountryController();
export default countryController;