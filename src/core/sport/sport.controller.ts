import Sport from './sport.model';

export class SportController {

  constructor() {
  }

  public getAll() {
    return Sport.where('deleted_at', null).fetchAll();
  }

  public getOne(id) {
    return Sport.where('id', id).where('deleted_at', null).fetch({ require: true });
  }

  public create(data) {
    return new Sport(data).save()
    .then((savedSport) => {
      return this.getOne(savedSport.id);
    });
  }

  public update(id, data) {
    return this.getOne(id)
    .then((foundSport) => {
      for (const key in data) {
        foundSport.set(key, data[key]);
      }
      foundSport.set('updated_at', new Date());
      return foundSport.save();
    })
    .then((savedSport) => {
      return this.getOne(savedSport.id);
    });
  }

  public delete(id) {
    return this.getOne(id)
    .then((foundSport) => {
      foundSport.set('deleted_at', new Date());
      return foundSport.save();
    })
    .then((savedSport) => {
      return;
    });
  }
}

const sportController = new SportController();
export default sportController;