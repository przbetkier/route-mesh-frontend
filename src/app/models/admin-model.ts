import {SimpleRoad} from './simple-road';

export class Admin {
  constructor(public id: number,
              public name: string,
              public address: string,
              public telephone: string,
              public postalCode: string,
              public email: string,
              public fax: string,
              public managesRoads: SimpleRoad[]) {
  }
}
