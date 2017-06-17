export default class BaseController {
  model;

  constructor() {
  }

  public getAll() {
    return this.model.where('deleted_at', null).fetchAll();
  }

  public getOne(id) {
    return this.model.where('id', id).where('deleted_at', null).fetch({ require: true });
  }

  public create(data) {
    return new this.model(data).save()
    .then((savedObj) => {
      return this.getOne(savedObj.id);
    });
  }

  public update(id, data) {
    return this.getOne(id)
    .then((foundObj) => {
      for (const key in data) {
        foundObj.set(key, data[key]);
      }
      foundObj.set('updated_at', new Date());
      return foundObj.save();
    })
    .then((savedObj) => {
      return this.getOne(savedObj.id);
    });
  }

  public delete(id) {
    return this.getOne(id)
    .then((foundObj) => {
      foundObj.set('deleted_at', new Date());
      return foundObj.save();
    })
    .then(() => {
      return;
    });
  }
}
