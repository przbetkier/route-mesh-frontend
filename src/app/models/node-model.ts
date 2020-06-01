import {SimpleRoad} from './simple-road';

export class Node {
  constructor(public id: number,
              public name: string,
              public latitude: number,
              public longitude: number,
              public startRoads: SimpleRoad[],
              public endRoads: SimpleRoad[],
              public type: string) {
  }
}
