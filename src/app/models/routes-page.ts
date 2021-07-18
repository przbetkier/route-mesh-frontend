import {Route} from './route-model';

export class RoutesPage {
  constructor(public content: Route[],
              public pageable: Pageable,
              public totalElements: number) {
  }
}

export class Pageable {
  constructor(public pageNumber: number) {
  }
}
