import {Road} from './road-model';

export class RoadsPage {
  constructor(public content: Road[],
              public pageable: Pageable,
              public totalElements: number) {
  }
}

export class Pageable {
  constructor(public pageNumber: number) {
  }
}
