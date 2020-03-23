import {Obstructions} from './obstructions-model';

export class ObstacleRequest {
  constructor(public roadId: number,
              public name: string,
              public city: string,
              public latitude: number,
              public longitude: number,
              public immovable: boolean,
              public milestone: number,
              public url: string,
              public comment: string,
              public obstructions: Obstructions) {
  }
}
