import {SimpleNode} from './simple-node-model';
import {SimpleAdmin} from './simple-admin';

export class Road {
  constructor(public id: number,
              public name: string,
              public startNode: SimpleNode,
              public endNode: SimpleNode,
              public roadDirection: string,
              public type: string,
              public numbers: string[],
              public kmRange: number[],
              public lines: number,
              public maxAxleLoad: number,
              public trafficFactor: number,
              public width: number,
              public admins: SimpleAdmin[],
              public obstacles: SimpleObstacle[]) {
  }
}

export interface SimpleObstacle {
  id: number;
  name: string;
  city: string;
  latitude: number;
  longitude: number;
  milestone: number;
  immovable: boolean;
  comment: string;
}
