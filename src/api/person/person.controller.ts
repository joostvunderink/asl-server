import Person from './person.model';
import BaseController from '../../core/base.controller';

export class PersonController extends BaseController {
  constructor() {
    super();
    this.model = Person;
  }
}

const personController = new PersonController();
export default personController;