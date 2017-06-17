import Region from './region.model';

export class RegionController {

  constructor() {
  }

  public getAll() {
    return Region.where('deleted_at', null).fetchAll();
  }

  public getOne(id) {
    return Region.where('id', id).where('deleted_at', null).fetch({ require: true });
  }

  public create(data) {
    return new Region(data).save()
    .then((savedRegion) => {
      return this.getOne(savedRegion.id);
    });
  }

  public update(id, data) {
    return this.getOne(id)
    .then((foundRegion) => {
      for (const key in data) {
        foundRegion.set(key, data[key]);
      }
      foundRegion.set('updated_at', new Date());
      return foundRegion.save();
    })
    .then((savedRegion) => {
      return this.getOne(savedRegion.id);
    });
  }

  public delete(id) {
    return this.getOne(id)
    .then((foundRegion) => {
      foundRegion.set('deleted_at', new Date());
      return foundRegion.save();
    })
    .then((savedRegion) => {
      return;
    });
  }
}

const regionController = new RegionController();
export default regionController;